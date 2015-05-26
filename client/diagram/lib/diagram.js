/**
 * Created by Tally on 20/05/2015.
 */
'use strict';

//angular.module ('morffy.diagram', [
//    'angular-meteor',
//    'ngMaterial',
//    'ui.router',
//    'ngAnimate',
//    'morffy.canvas'
//])
angular.module ('morffy')
.config (function ($stateProvider){
    $stateProvider.state ('diagram',{
        url: '/diagram/:diagramId',
        abstract: true,
        templateUrl: 'client/diagram/views/diagram.ng.html',
        controller: 'DiagramCtrl',
        resolve: {
            diagram: function ($stateParams, $meteor) {
                return $meteor.object (DiagramsModel, new Mongo.ObjectID( $stateParams.diagramId), false);
            },
            diagramElements: function ($stateParams, $meteor) {
                return $meteor.subscribe('diagramElements', new Mongo.ObjectID ($stateParams.diagramId));
            }
        }
    });

    $stateProvider.state ('diagram.canvas',{
        url:'/canvas' ,
        sticky: true,
        views: {
            diagram: {
                templateUrl: 'client/canvas/views/canvas.ng.html',
                controller: 'CanvasCtrl'
            },
            diagramMenu: {
                templateUrl: 'client/diagram/views/diagram-menu.ng.html',
                controller: 'DiagramMenuCtrl'
            }
        }
    });

    $stateProvider.state ('diagram.timeview',{
        url:'/timeview' ,
        sticky: true,
        views: {
            diagram: {
                templateUrl: 'client/timeview/views/timeview.ng.html',
                controller: 'TimeviewCtrl'
            },
            diagramMenu: {
                templateUrl: 'client/diagram/views/diagram-menu.ng.html',
                controller: 'DiagramMenuCtrl'
            }
        }
    });

    $stateProvider.state ('diagram.element',{
        url:'/element/{elementId}' ,
        sticky: true,
        views: {
            diagram: {
                templateUrl: 'client/element/views/element.ng.html',
                controller: 'ElementCtrl'
            },
            diagramMenu: {
                templateUrl: 'client/element/views/element-menu.ng.html',
                controller: 'DiagramMenuCtrl'
            }
        }
    });
});