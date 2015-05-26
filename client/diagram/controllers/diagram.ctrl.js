/**
 * Created by Tally on 16/04/2015.
 */

'use strict';


angular.module('morffy').controller('DiagramCtrl', function DiagramCtrl  ($scope, $mdDialog, $log, diagram, diagramElements, unitsSvc, $meteor, DiagramSvc) {

    $scope.diagram = diagram;

    $scope.elements = diagramElements;

    $scope.editSettings = function ($event) {

        var controller = function (units, diagram){
            var vm = this;
            vm.units = units;
            vm.diagramDetails = diagram;
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
                units: unitsSvc.get(),
                diagram: $scope.diagram
            },
            bindToController: true
        }).then (function (response){
            DiagramSvc.update(response, $scope.diagram);
        });
    };

    //$scope.selectedElement = ElementSvc.selectedElement;

});

