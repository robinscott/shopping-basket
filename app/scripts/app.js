'use strict';

/**
 * @ngdoc overview
 * @name shoppingBasketApp
 * @description
 * # shoppingBasketApp
 *
 * Main module of the application.
 */
angular
    .module('shoppingBasketApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
