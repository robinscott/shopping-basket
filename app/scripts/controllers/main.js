'use strict';

/**
 * @ngdoc function
 * @name shoppingBasketApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingBasketApp
 */
angular.module('shoppingBasketApp')
    .controller('MainCtrl', function ($scope, $http) {

        $scope.accordion = {
            section1Collapsed: false,
            section2Collapsed: true,
            section3Collapsed: true
        };

        $scope.product = {
            chosenProduct: '',
            products: [],
            userQuantity: 0
        };

        $scope.cost = function(price) {
            return price * product.userQuantity;
        };

        $http.get('scripts/prices.json').
            then(function (response) {
                $scope.product.products = response.data;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    });
