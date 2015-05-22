/**
 * Created by Tally on 14/04/2015.
 */

'use strict';

angular.module('morffy').controller('diagramSettingsCtrl', function ($scope, $mdDialog, $log, $state, unitsSvc, $meteor, diagramDetails) {


    $scope.units = unitsSvc.get();

    $scope.diagramDetails = diagramDetails;

    $scope.ok = function () {
        $scope.diagramDetails.save($scope.diagramDetails).then (function (response){
            $mdDialog.hide();
            $state.go ('diagram.canvas', {diagramId: response._id});
        });
    };

    $scope.cancel = function () {
        $mdDialog.hide();
    };
});

