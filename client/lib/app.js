/**
 * Created by Tally on 11/04/2015.
 */


angular.module('morffy',[
    'angular-meteor',
    'ngMaterial',
    'ui.router',
    'ngAnimate'
]);

angular.module ('morffy').config (function ($mdThemingProvider){
/*        $mdThemingProvider.definePalette('morffy', {
            '50': 'FFFFFF',
            //'50': 'DEF2F4',
            //'100': 'B0DFE3',
            '100': 'FFFFFF',
            '200': '80CCD3',
            '300': '4CB7C0',
            '400': '26A8B3',
            '500': '0199A6',
            '600': '008B97',
            '700': '007C86',
            '800': '006C76',
            '900': '005056',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
            'contrastLightColors': undefined
        });

        $mdThemingProvider.definePalette('morffyAlt', {
            '50': 'F7E6E6',
            '100': 'EBBFBF',
            '200': 'D78080',
            '300': 'C34040',
            '400': 'AE0000',
            '500': '940000',
            '600': '830000',
            '700': '570000',
            '800': '2C0000',
            '900': '110000',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
            'contrastLightColors': undefined
        });

        $mdThemingProvider.theme('default').primaryPalette('morffy').accentPalette ('morffyAlt');
 */
});


angular.module('morffy').config(function AppConfig ( $stateProvider, $urlRouterProvider,$locationProvider ){
    $locationProvider.html5Mode(true);

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'client/home/views/diagrams.ng.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state ('diagram',{
        url: '/diagram/:diagramId',
        abstract: true,
        templateUrl: 'client/diagram/views/diagram.tpl.html',
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
    $urlRouterProvider.otherwise( '/' );

});

