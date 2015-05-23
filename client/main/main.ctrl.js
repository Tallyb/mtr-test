/**
 * Created by Tally on 14/04/2015.
 */

(function (){
    angular.module('morffy').controller('HomeCtrl', function ($scope, $log, $state, $meteor, $mdDialog) {

        $scope.diagrams = $meteor.collection(DiagramsModel).subscribe('diagrams');

        /* adding a diagram in a modal window when pressing the new diagram button and going to the diagram screen */
        $scope.createDiagram = function () {
            $mdDialog.show({
                templateUrl: 'client/diagram/views/diagram-settings.ng.html',
                controller: 'diagramSettingsCtrl',
                controllerAs: 'dsc',
                resolve: {
                    diagramDetails: function () {
                        return ({
                        });
                    }
                }
            })
        };

        $scope.deleteDiagram = function (dg){
            $scope.diagrams.remove (dg);
        };

        $scope.openDiagram = function (dgId) {
            $state.go ('diagram.canvas', {diagramId: dgId._str});
        };
    });

})();
