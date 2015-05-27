/**
 * Created by Tally on 11/04/2015.
 */

Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
});

angular.module('morffy',[
    'angular-meteor',
    'ngMaterial',
    'ui.router',
    'ngAnimate',
    'morffy.canvas'
])

.config (function ($mdThemingProvider){
        $mdThemingProvider.definePalette('morffy', {
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
})

.config(function  ( $stateProvider, $urlRouterProvider,$locationProvider ){
    $locationProvider.html5Mode(true);

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'client/main/views/main.ng.html',
        controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise( '/' );

})


    .run(function ($rootScope, $location) {
        // Redirect to login if route requires auth and you're not logged in
        //$rootScope.$on('$stateChangeStart', function (event, next) {
        //    Auth.isLoggedInAsync(function(loggedIn) {
        //        if (next.authenticate && !loggedIn) {
        //            $location.path('/login');
        //        }
        //    });
        //});

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log('$stateChangeError - fired when an error occurs during transition.');
            console.log(arguments);
            console.log("error is: " + error);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
        });

        $rootScope.$on('$viewContentLoaded', function (event) {
            console.log('$viewContentLoaded - fired after dom rendered', event);
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
            console.log(unfoundState, fromState, fromParams);
        });
    });


;

