/**
 * Created by Tally on 16/04/2015.
 */

'use strict';


angular.module('morffy').controller('DiagramCtrl', function DiagramCtrl  ($scope, $mdDialog, $log, TimelineSvc, unitsSvc, $meteor, $stateParams, DiagramSvc) {

    $scope.dgId = $stateParams.diagramId;
    Session.set ('currentDiagramId',$scope.dgId);

    var diagramDep = new Tracker.Dependency;

    $meteor.autorun($scope, function () {
        console.log('diagram changed', Session.get('currentDiagramId'));
        $scope.diagram = DiagramSvc.diagramObject;
        $log.info ($scope.diagram);
        $scope.timeline = TimelineSvc.get($scope.diagram);
        $scope.elements = DiagramSvc.diagramElements;
    });

    $scope.editSettings = function ($event) {

        $mdDialog.show({
            templateUrl: 'client/diagram/views/diagram-settings.ng.html',
            controller: 'diagramSettingsCtrl',
            controllerAs: 'dsc',
            targetEvent: $event,
            locals: {
                diagramDetails: $scope.diagram
            },
            bindToController: true
        }).then (function (response){
            DiagramSvc.update(response, $scope.diagram);
        });
    };

    //$scope.selectedElement = ElementSvc.selectedElement;

});

