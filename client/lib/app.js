/**
 * Created by Tally on 11/04/2015.
 */


angular.module('morffy',[
    'angular-meteor',
    'ngMaterial',
    'ui.router',
    'ngAnimate'
]);

angular.module('morffy').config(function AppConfig ( $stateProvider, $urlRouterProvider,$locationProvider ){
    $urlRouterProvider.otherwise( '/home' );
    $locationProvider.html5Mode(true);

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'client/home/home.ng.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state ('diagram',{
        url: '/diagram/{diagramId}',
        abstract: true,
        templateUrl: 'app/diagram/views/diagram.tpl.html',
        controller: 'DiagramCtrl'
    });

    $stateProvider.state ('diagram.canvas',{
        url:'/canvas' ,
        sticky: true,
        views: {
            diagram: {
                templateUrl: 'client/canvas/views/canvas.tpl.html',
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

