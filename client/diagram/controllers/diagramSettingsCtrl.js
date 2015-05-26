/**
 * Created by Tally on 14/04/2015.
 */

'use strict';

angular.module('morffy').controller('diagramSettingsCtrl', function ($mdDialog, $log, $state, unitsSvc, $meteor, diagramDetails) {

    var vm = this;
    vm.units = unitsSvc.get();

    vm.diagramDetails = diagramDetails;

    vm.ok = function () {
        return vm.$meteorCollection(DiagramsModel, false).save(vm.diagramDetails).then (function (response){
            $mdDialog.hide();
        });
    };

    vm.cancel = function () {
        return $mdDialog.hide();
    };
});

