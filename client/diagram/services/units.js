/**
 * Created by Tally on 15/04/2015.
 */

(function () {

    angular.module('morffy').factory('units', function units($log) {

        var _units = [
                {name: "Months", months: 1, code: "M"},
                {name: "Quarters", months: 3, code: "Q"},
                {name: "Semesters", months: 6, code: "H"},
                {name: "Years", months: 12, code: "Y"}
            ];

        return {
            getNamesList: function (){
                return _.pluck (_units, 'name');
            },

            getCode: function (unit) {
                return _.find (_units, {name: unit}).code;
            },

            getMonths: function (unit) {
                return _.find (_units, {name: unit}).months;
            }
        };
    });
})();