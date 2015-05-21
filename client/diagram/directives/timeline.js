/**
 * Created by Tally on 21/05/2015.
 */
'use strict';

angular.module ('morffy.diagram').directive ('diagramTimeline', function (){
    function ctrl ($scope, TimelineSvc){
        $scope.timeline = TimelineSvc.get ($scope.diagram);
    }

    return {
        restrict: 'E',
        templateUrl: 'client/diagram/directives/timeline.ng.html',
        controller: ctrl
    }
});