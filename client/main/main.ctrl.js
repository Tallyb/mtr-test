/**
 * Created by Tally on 14/04/2015.
 */

'use strict';
angular.module('morffy').controller('MainCtrl', function ($scope, $log, $state, $mdDialog, unitsSvc, DiagramsSvc) {

    $scope.diagrams = DiagramsSvc.get();
    Session.set('currentDiagramId', undefined);

    /* adding a diagram in a modal window when pressing the new diagram button and going to the diagram screen */
    $scope.createDiagram = function ($event) {

        $mdDialog.show({
            templateUrl: 'client/diagram/views/diagram-settings.ng.html',
            controller: 'diagramSettingsCtrl',
            controllerAs: 'dsc',
            targetEvent: $event,
            locals: {
                diagramDetails: {}
            },
            bindToController: true
        }).then (function (response){
            DiagramsSvc.add (response).then (function (response){
                $log.info ('added diagram: ' +response);
                $state.go ('diagram.canvas', {diagramId: response[0]._id._str});
            });
        });
    };

    $scope.deleteDiagram = function (dg){
        DiagramsSvc.remove (dg._id);
    };

    $scope.openDiagram = function (dgId) {
        console.log (dgId);
        $state.go ('diagram.canvas', {diagramId: dgId._str});
    };
});

