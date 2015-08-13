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

        var calculateUnitcost = function(unitcost, quantity) {
            return unitcost * quantity;
        };

        var calculateCostPerUser = function(unitcost, discount) {
            discount = (100 - discount) / 100;
            return unitcost * discount;
        };

        var calculateTotal = function(unitcost, discount, quantity, userQuantity) {
            discount = (100 - discount) / 100;
            var discountedUnit = unitcost * discount;
            return (discountedUnit * quantity) * userQuantity;
        };

        var checkQuantityChosen = function() {
            return $scope.productDetails.user1Quantity > 0 || $scope.productDetails.user5Quantity > 0 || $scope.productDetails.user10Quantity > 0;
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
            user5Quantity: 0,
            user10Quantity: 0,
            chosenSupport: '',
            unitcost: calculateUnitcost,
            CostPerUser: calculateCostPerUser,
            total: calculateTotal,
            checkQuantityChosen: checkQuantityChosen
        };

        $http.get('scripts/prices.json').
            then(function (response) {
                $scope.productDetails.products = response.data;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    });
