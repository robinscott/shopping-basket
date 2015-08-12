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

        var calculateUnitcost = function(unitcost, discount) {
            discount == 0 ? discount = 1 : discount;
            return unitcost * discount;
        };

        var calculateTotal = function(unitcost, discount) {
            discount == 0 ? discount = 100 : discount;
            discount = discount / 100;
            return (unitcost * discount) * this.user1Quantity;
        };

        $scope.accordion = {
            section1Collapsed: false,
            section2Collapsed: true,
            section3Collapsed: true
        };

        $scope.productDetails = {
            chosenProduct: '',
            products: [],
            user1Quantity: 0,
            unitcost: calculateUnitcost,
            total: calculateTotal
        };

        $http.get('scripts/prices.json').
            then(function (response) {
                $scope.productDetails.products = response.data;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    });
