/**
 * Created by Tally on 16/04/2015.
 */

(function(){

    angular.module('morffy').factory('TimelineSvc', function TimelineSvc ($log, units, $q ) {

        // calculates the label to be displayed on intervals, based on the interval offset, the unit and the startdate, if exists.
        function _calculateLabel (offset, unitName, startDate) {
            var label = "";

            var MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            if (!startDate) {
                label = units.getCode(unitName) + (offset+1);
            }
            else {
                // this is teh part of the year the date is in. e.g. for 16/10 the result will be as follow:
                // for months: 10, for quarters: 3, for semesters: 2, for years: 1 (and later ignored)
                var d = new Date(startDate);
                // adding months to the start date as per the units and offset of the interval
                d.setMonth(d.getMonth() + units.getMonths(unitName) * offset);

                switch (units.getCode(unitName)) { //formatting the label according the unit
                    case "M":
                        label = MONTH_NAMES_SHORT [d.getMonth()] +" - "+ d.getFullYear()%100;
                        break;
                    case "Q":
                    case "H":
                        label = units.getCode(unitName)+Math.ceil((d.getMonth()+1) / units.getMonths(unitName)) +" - "+ d.getFullYear()%100;
                        break;
                    case "Y":
                        label = d.getFullYear();
                        break;
                }
            }
            return label;
        }

        function Interval (ind) {
            this.offset = ind;
            this._label = null;
            this.ms = null;

            this.label = function () {return this._label;};
            this.isMS = function (){return !_.isNull (this.ms); };
            this.msDescription = function (){return !_.isNull (this.ms) ? this.ms.description : null; };
            this.msCode = function (){return !_.isNull (this.ms) ? this.ms.code : null; };
            this.addMS = function (ms) {
                this.ms = ms;
            };
            this.removeMS = function () {
                this.ms = null;
            };
            this.setLabel = function (offset, unitName, startDate) {
                this._label = _calculateLabel (offset, unitName, startDate);
            };
        }

        //return initialized intervals array as per diagram data and with milestones
        function generateIntervals (diagramDetails, milestones){
            var v;
            var intervals = [];
            for (var i = 0; i < diagramDetails.totalIntervals; i++) {
                v = new Interval(i);
                v.setLabel (i, diagramDetails.unit, diagramDetails.startDate);
                intervals.push(v);
            }
            // setting milestones according to diagram data
            _.each (milestones, function (e){
                if (e.offset < diagramDetails.totalIntervals){
                    intervals [e.offset].addMS (e);
                }
            });
            return intervals;
        }

        function extractMilestones (intervals){
            var milestones = _.pluck(intervals, 'ms');
            milestones = _.compact(milestones);
            return milestones;
        }

        /*
         * @description get the next milestone on the right or the left
         * @param intervals - the intervals array with milestones data
         * @param dir - direction to search - "L" or "R"
         * @param offset - the offset from which to look
         * @return the offset of the next adjunct milestone to the left or right.
         * if not found to the right will return 0, if not found to the left, will return the array length (i.e. last interval);
         * */

        function _getAdjunctMS (intervals, dir, offset) {
            var i, result;
            var remain;
            if (offset > intervals.length) {
                return 'No such offset';
            }
            if (dir !== "R" && dir !== "L") {
                return 'invalid direction';
            }

            if (dir === "L") {
                remain = _.initial(intervals, intervals.length - offset );
                i = _.findLastIndex(remain, function (e) {
                    return e.isMS();
                });
                result = (i !== -1) ? remain[i].offset : 0;
            }
            if (dir === "R") {
                remain = _.rest(intervals, offset + 1);
                i = _.findIndex(remain, function (e) {
                    return e.isMS();
                });
                result = (i !== -1) ? remain[i].offset : intervals.length;
            }
            return result;
        }

        return {
            diagramId: null,
            intervals: [],
            selectedInterval: 0,
            selectedCompare: null,
            intervalWidth: 100,

            /*
             * @description generates the intervals of the diagrams based on the diagram details and milestone
             * @param dgID - the id of the diagram to retrieve the info
             * @return intervals array with all milestones on it
             * */

            get: function (diagram){ // initialize a timeline for an existing diagram (retrieve info & milestones)
                return generateIntervals (diagram, diagram.milestones);

                //var self = this;
                //var diagram = Diagrams.one(dgId).get();
                //var milestones = Diagrams.one(dgId).all('milestones').getList();
                //return $q.all ([diagram, milestones]).then (function (response){
                //    self.intervals = generateIntervals(response[0], response[1]);
                //    self.setSelectedInterval(0);
                //    self.diagramId = dgId;
                //    return self.intervals;
                //});
            },

            getIntervalWidth: function () {
                return {'min-width': this.intervalWidth+'px'};
            },

            // total intervals can only be after the last milestone
            getLastMilestoneOffset: function (){
                var i = _.findLastIndex(this.intervals, function (e){
                    return e.isMS();
                });
                return i>0 ? i : 0;
            },

            setSelectedInterval: function (offset) {
                this.selectedInterval = offset;
                this.selectedCompare = null;
            },

            setSelectedCompare: function (offset) {
                this.selectedCompare = offset;
            },

            getAdjunctMS: function ( dir, offset){
                return _getAdjunctMS(this.intervals, dir, offset);
            },

            /*
             * @description validates the points to which the milestones can move, as milestone can be moved up to the next adjunct milestone
             * @param newOffset - the new offset to which wants to move
             * @param oldOffset - the offset from which wants to move
             * @return predicate if the move is acceptable
             * */
            validateMSMove: function ( newOffset, oldOffset){
                var left = _getAdjunctMS(this.intervals,"L", oldOffset);
                var right = _getAdjunctMS(this.intervals,"R", oldOffset);
                return oldOffset !== 0 && newOffset !== oldOffset && newOffset > left && newOffset < right;
            },

            addMS : function (ms) {
                var self = this;
                return Diagrams.one(self.diagramId).all('milestones').post (ms).then (function (response){
                    self.intervals[ms.offset].addMS (response);
                    return self.intervals;
                });
            },

            removeMS: function (ms) {
                var self = this;
                var offset = ms.offset;
                return ms.remove ().then (function(){
                    self.intervals[offset].removeMS();
                    return self.intervals;
                });
            },

            moveMS: function (oldOffset, newOffset) {
                var self = this;
                var ms = self.intervals[oldOffset].ms;
                if (this.validateMSMove(newOffset, oldOffset ) ) {
                    ms.offset = newOffset;
                    return ms.save().then (function (response) {
                        self.intervals[oldOffset].removeMS();
                        self.intervals[newOffset].addMS (response);
                        return self.intervals;
                    }, function (error) {
                        ms.offset = oldOffset;
                    });
                }
            },

            updateMS: function (ms) {
                var self = this;
                return ms.save().then (function (response){
                    self.intervals[ms.offset].addMS (response);
                    return self.intervals;
                });
            },

            getMSOffset : function (msId) {
                var self = this;
                var ms = _.find (self.intervals, function (e) {
                    return e.isMS() ? e.ms.id === msId : false;
                });
                return !!(ms) ?  ms.offset : null;
            },
            getCompareOffsets: function (){
                var self = this;
                return [self.selectedInterval, self.selectedCompare];
            }
        };
    });
})();
