/**
 * Created by Tally on 14/04/2015.
 */

'use strict';
angular.module('morffy').controller('MainCtrl', function ($scope, $log, $state, diagramsCollection, $mdDialog, unitsSvc, DiagramSvc) {

    $scope.diagrams = diagramsCollection;

    /* adding a diagram in a modal window when pressing the new diagram button and going to the diagram screen */
    $scope.createDiagram = function ($event) {

        var controller = function (units){
            var vm = this;
            vm.units = units;
            vm.diagramDetails = {};
            vm.ok = function () {
                $mdDialog.hide(vm.diagramDetails);
            };
            vm.cancel = function () {
                return $mdDialog.cancel();
            };
        };

        $mdDialog.show({
            templateUrl: 'client/diagram/views/diagram-settings.ng.html',
            controller: controller,
            controllerAs: 'dsc',
            targetEvent: $event,
            locals: {
                units: unitsSvc.get()
            },
            bindToController: true
        }).then (function (response){
            DiagramSvc.add (response).then (function (response){
                $state.go ('diagram.canvas', {diagramId: response._id._str});
            });
        });
    };

    $scope.deleteDiagram = function (dg){
        DiagramSvc.remove (dg._id);
    };

    $scope.openDiagram = function (dgId) {
        $state.go ('diagram.canvas', {diagramId: dgId._str});
    };
});

