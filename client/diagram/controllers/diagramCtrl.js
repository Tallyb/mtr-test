/**
 * Created by Tally on 16/04/2015.
 */

(function () {

    angular.module('morffy').controller('DiagramCtrl', function DiagramCtrl  ($scope, $mdDialog, $log, $state, $rootScope, $stateParams, $meteor, TimelineSvc ) {


        $scope.inDiagrams = $meteor.collection (DiagramsModel);
        var temp = DiagramsModel.findOne({_id: $stateParams.diagramId});
        //$scope.diagram = $meteor.object (DiagramsModel, $stateParams.diagramId);

        $scope.elements = $meteor.collection(function() {
            return ElementsModel.find({diagram_id: $stateParams.diagramId}, {
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

