/**
 * Created by Tally on 14/04/2015.
 */

(function (){
    'use strict';

    angular.module('morffy').controller('diagramSettingsCtrl', function ($scope, $mdDialog, $log, $state, units, $meteor, diagramDetails) {

        $scope.units = units;

        $scope.diagramDetails = diagramDetails;

        $scope.ok = function () {
            $scope.diagrams.save($scope.diagramDetails). then (function (response){
                $mdDialog.hide();
                $state.go ('diagram.canvas', {diagramId: response._oid});
            });
        };

        $scope.cancel = function () {
            $mdDialog.hide();
        };
    });

})();

