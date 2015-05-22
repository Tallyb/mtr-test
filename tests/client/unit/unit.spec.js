/**
 * Created by Tally on 02/05/2015.
 */

'use strict';

describe('units label service',function (){
    var unitsSvc;
    beforeEach (function (){
        angular.module('morffy.diagram');
        inject(function (_unitsSvc_) {
            unitsSvc = _unitsSvc_;
        });
    });
    it ('should return all units',function (){
        var r = unitsSvc.get();
        expect (r.length).toEqual (4) ;
    });

    it ('should return a fixed unit label ',function (){
        var r = unitsSvc.calculateLabel(5, 'Quarters');
        expect(r).toEqual('Q6');
    });

    it('should return a quarter date based unit label ', function () {
        var r = unitsSvc.calculateLabel(5, 'Quarters', new Date('Thu May 07 2015 11:30:14 GMT+0300 (Jerusalem Daylight Time)'));
        expect(r).toEqual('Q3 - 16');
    });

    it('should return a year date based unit label ', function () {
        var r = unitsSvc.calculateLabel(3, 'Years', new Date('Thu May 07 2015 11:30:14 GMT+0300 (Jerusalem Daylight Time)'));
        expect(r).toEqual(2018);
    });

    it('should return a months date based unit label ', function () {
        var r = unitsSvc.calculateLabel(3, 'Months', new Date('Thu May 07 2015 11:30:14 GMT+0300 (Jerusalem Daylight Time)'));
        expect(r).toEqual('Aug - 15');
    });

});
