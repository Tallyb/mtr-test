/**
 * Created by Tally on 14/04/2015.
 */

'use strict';

angular.module('morffy').controller('diagramSettingsCtrl', function ($mdDialog, $log, $state, unitsSvc, $meteor, diagramDetails) {

    var vm = this;
    vm.units = unitsSvc.get();

    vm.diagramDetails = diagramDetails;

    vm.ok = function () {
        vm.diagramDetails.save(vm.diagramDetails).then (function (response){
            $mdDialog.hide();
            $state.go ('diagram.canvas', {diagramId: response._id});
        });
    };

    vm.cancel = function () {
        $mdDialog.hide();
    };
});

