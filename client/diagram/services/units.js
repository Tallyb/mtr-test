/**
 * Created by Tally on 02/05/2015.
 */
'use strict';

angular.module('morffy.diagram').factory('unitsSvc', function units($log) {

    var MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var _units = [
        {
            name: 'Months', months: 1, code: 'M', getDateLabel: function (d) {
            return MONTHS_SHORT [d.getMonth()] +' - '+ d.getFullYear()%100;
        }},
        {
            name: 'Quarters', months: 3, code: 'Q', getDateLabel: function (d) {
            return this.code + Math.ceil((d.getMonth() + 1) / 3) + ' - ' + d.getFullYear() % 100;
        }},
        {
            name: 'Semesters', months: 6, code: 'H', getDateLabel: function (d) {
            return this.code + Math.ceil((d.getMonth() + 1) / 6) + ' - ' + d.getFullYear() % 100;
        }},
        {
            name: 'Years', months: 12, code: 'Y', getDateLabel: function (d) {
            return d.getFullYear();
        }}
    ];


    return {
        get: function (){
            return _units;
        },

        calculateLabel: function (offset, unitName, startDate) {
            var unit = _.find (_units, {name: unitName});
            if (!unit) {
                console.log('error in unit name');
                return undefined;
            }
            var label = '';

            if (!startDate) {
                label = unit.code + (offset+1);
            }
            else {
                // this is teh part of the year the date is in. e.g. for 16/10 the result will be as follow:
                // for months: 10, for quarters: 3, for semesters: 2, for years: 1 (and later ignored)
                var d = new Date(startDate);
                // adding months to the start date as per the units and offset of the interval
                d.setMonth(d.getMonth() + unit.months * offset);
                return unit.getDateLabel(d);
            }
            return label;
        }

    };
});
