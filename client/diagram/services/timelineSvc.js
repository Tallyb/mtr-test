/**
* Created by Tally on 16/04/2015.
*/
'use strict';

angular.module('morffy.diagram').factory('TimelineSvc', function TimelineSvc($log, unitsSvc) {

    function Interval(ind) {
        this.offset = ind;
        this.ms = null;

        this.isMS = function () {
            return !_.isNull(this.ms);
        };
        this.msDescription = function () {
            return !_.isNull(this.ms) ? this.ms.description : null;
        };
        this.msCode = function () {
            return !_.isNull(this.ms) ? this.ms.code : null;
        };
    }

    //return initialized intervals array as per diagram data and with milestones
    function generateIntervals(diagram) {
        var v;
        var intervals = [];
        for (var i = 0; i < diagram.totalIntervals; i++) {
            v = new Interval(i);
            v.label = unitsSvc.calculateLabel(i, diagram.unit, diagram.startDate);
            intervals.push(v);
        }
        // setting milestones according to diagram data
        _.each(diagram.milestones, function (e) {
            if (e.offset < diagram.totalIntervals) {
                intervals [e.offset].ms = e;
            }
        });
        return intervals;
    }


    return {

        get: function (diagram) {
            var v;
            var intervals = [];
            for (var i = 0; i < diagram.totalIntervals; i++) {
                v = new Interval(i);
                v.label = unitsSvc.calculateLabel(i, diagram.unit, diagram.startDate);
                intervals.push(v);
            }
            // setting milestones according to diagram data
            _.each(diagram.milestones, function (e) {
                if (e.offset < diagram.totalIntervals) {
                    intervals [e.offset].ms = e;
                }
            });
            return intervals;
        },

        getAdjunctMS: function (intervals, dir, offset) {
            var i, result;
            var remain;
            if (offset > intervals.length) {
                return 'No such offset';
            }
            if (dir !== 'R' && dir !== 'L') {
                return 'invalid direction';
            }

            if (dir === 'L') {
                remain = _.dropRight(intervals, intervals.length - offset);
                i = _.findLastIndex(remain, function (e) {
                    return e.isMS();
                });
                result = (i !== -1) ? remain[i].offset : 0;
            }
            if (dir === 'R') {
                remain = _.drop(intervals, offset + 1);
                i = _.findIndex(remain, function (e) {
                    return e.isMS();
                });
                result = (i !== -1) ? remain[i].offset : intervals.length;
            }
            return result;
        },
        validateMSMove: function (intervals, newOffset, oldOffset) {
            var left = this.getAdjunctMS(intervals, 'L', oldOffset);
            var right = this.getAdjunctMS(intervals, 'R', oldOffset);
            return oldOffset !== 0 && newOffset !== oldOffset && newOffset > left && newOffset < right;
        }
    };
});
