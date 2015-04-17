/**
 * Created by Tally on 16/04/2015.
 */

(function () {

    angular.module('morffy').controller('DiagramCtrl', function DiagramCtrl  ($scope, $mdDialog, $log, $state, $rootScope, $stateParams, $meteor, TimelineSvc ) {

        $scope.diagram = $meteor.object ('diagrams', $stateParams.diagramId);
        $scope.elements = $meteor.collection ('elements');

        $scope.elements = $meteor.collection(function() {
            return Elements.find({diagram_id: $scope.diagram.oid}, {
            });
        });
        $scope.timeline = TimelineSvc.get ($scope.diagram);

        $scope.editSettings = function () {
            $state.go ('diagram.settings');
        };

        //$scope.selectedElement = ElementSvc.selectedElement;

    });

})();

