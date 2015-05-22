/**
 * Created by Tally on 16/04/2015.
 */

'use strict';


angular.module('morffy').controller('DiagramCtrl', function DiagramCtrl  ($scope, $mdDialog, $log, diagram, elements, TimelineSvc, $meteor ) {

    $scope.diagram = diagram;

    $scope.elements = elements;


    $scope.editSettings = function () {
        $mdDialog.show({
            templateUrl: 'client/diagram/views/diagram-settings.ng.html',
            controller: 'diagramSettingsCtrl',
            resolve: {
                diagramDetails: function () {
                    return ($scope.diagram);
                }
            }
        });
    };

    //$scope.selectedElement = ElementSvc.selectedElement;

});

