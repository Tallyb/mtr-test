/**
 * Created by Tally on 14/04/2015.
 */

(function (){
    angular.module('morffy').controller('HomeCtrl', function HomeCtrl ($scope, $log, $state, $meteor, $mdDialog) {


        /* adding a diagram in a modal window when pressing the new diagram button and going to the diagram screen */

        $scope.diagrams =  $meteor.collection (Diagrams);

        $scope.createDiagram = function () {
            $mdDialog.show({
                templateUrl: 'client/diagram/views/diagram-settings.ng.html',
                controller: 'newDiagramCtrl',
                resolve: {
                    DiagramDetails: function () {
                        return ({});
                    }
                }
            })
        };

        $scope.deleteDiagram = function (dg, idx){
            $scope.diagrams.splice(idx,1);
        };

        $scope.openDiagram = function (dgId) {
            $state.go ('diagram.canvas', {diagramId: dgId});
        };
    });

})();
