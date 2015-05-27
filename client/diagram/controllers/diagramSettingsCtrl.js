/**
 * Created by Tally on 14/04/2015.
 */

'use strict';

angular.module('morffy').controller('diagramSettingsCtrl', function ($mdDialog, $log, unitsSvc, diagramDetails) {

    var vm = this;
    vm.units = unitsSvc.get();
    vm.diagramDetails = diagramDetails._id ? diagramDetails.getRawObject() : diagramDetails;
    vm.ok = function () {
        $mdDialog.hide(vm.diagramDetails);
    };
    vm.cancel = function () {
        return $mdDialog.cancel();
    };
});

