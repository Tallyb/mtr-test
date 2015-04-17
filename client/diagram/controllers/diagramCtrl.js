/**
 * Created by Tally on 16/04/2015.
 */

(function () {

    angular.module('morffy').controller('DiagramCtrl', function DiagramCtrl  ($scope, $mdDialog, $log, $state, $rootScope, $stateParams, $meteor, TimelineSvc ) {

        var diagrams = $meteor.collection (Diagrams);
        $scope.diagram = $meteor.object (diagrams, $stateParams.diagramId);

        $scope.elements = $meteor.collection(function() {
            return Elements.find({diagram_id: $scope.diagram._id}, {
            });
        });
        $scope.timeline = TimelineSvc.get ($scope.diagram);

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

})();

