/**
 * Created by Tally on 14/04/2015.
 */

(function (){
    'use strict';

    angular.module('morffy').controller('newDiagramCtrl', function newDiagramCtrl  ($scope, $mdDialog, $log, $state, units, $meteor) {

        $scope.units = units;

        $scope.DiagramInfo = {
            milestones: [
                {
                    "id": 0,
                    "offset": 0,
                    "code": "BL",
                    "description": "Baseline"
                }
            ]
        };

        $scope.ok = function () {
            $scope.diagrams.save($scope.DiagramInfo). then (function (response){
                $mdDialog.hide();
                $state.go ('diagram.canvas', {diagramId: response._oid});
            });
        };

        $scope.cancel = function () {
            $mdDialog.hide();
        };
    });

})();

