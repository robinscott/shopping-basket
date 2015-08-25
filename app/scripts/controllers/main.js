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

        var calculateUnitcost = function (quantity) {
            if ($scope.productDetails.currentProduct) {
                return $scope.productDetails.currentProduct.unitcost * quantity;
            }
        };

        var calculateCostPerUser = function (discount) {
            if ($scope.productDetails.currentProduct) {
                discount = (100 - discount) / 100;
                return $scope.productDetails.currentProduct.unitcost * discount;
            }
        };

        var calculateTotal = function (discount, quantity, userQuantity) {
            if ($scope.productDetails.currentProduct) {
                discount = (100 - discount) / 100;
                var discountedUnit = $scope.productDetails.currentProduct.unitcost * discount;
                return (discountedUnit * quantity) * userQuantity;
            }
        };

        var checkQuantityChosen = function () {
            return $scope.productDetails.user1Quantity > 0 || $scope.productDetails.user5Quantity > 0 || $scope.productDetails.user10Quantity > 0;
        };

        var updateSelectedProduct = function () {
            for (var i = 0; i < $scope.productDetails.products.length; i++) {
                if ($scope.productDetails.products[i].name === $scope.productDetails.selectedProduct) {
                    $scope.productDetails.currentProduct = $scope.productDetails.products[i];

                    var $product = $scope.productDetails.currentProduct;

                    // Calculate unit cost for license packs
                    $product.userLicensePacks = [1, 5, 10];
                    $product.user1unitcost = calculateUnitcost($product.userLicensePacks[0]);
                    $product.user5unitcost = calculateUnitcost($product.userLicensePacks[1]);
                    $product.user10unitcost = calculateUnitcost($product.userLicensePacks[2]);

                    // Calculate cost per user for license packs
                    $product.discount1pack = 0;
                    $product.user1costPerUser = calculateCostPerUser($product.discount1pack);
                    $product.user5costPerUser = calculateCostPerUser($product.discount5pack);
                    $product.user10costPerUser = calculateCostPerUser($product.discount10pack);

                    // Calculate sub total
                    $product.user1subTotal = function () {
                        return calculateTotal($product.discount1pack, $scope.productDetails.user1Quantity, $product.userLicensePacks[0]);
                    };
                    $product.user5subTotal = function () {
                        return calculateTotal($product.discount5pack, $scope.productDetails.user5Quantity, $product.userLicensePacks[1]);
                    };
                    $product.user10subTotal = function () {
                        return calculateTotal($product.discount10pack, $scope.productDetails.user10Quantity, $product.userLicensePacks[2]);
                    };
                }
            }
        };

        $scope.accordion = {
            section1Collapsed: false,
            section2Collapsed: true,
            section3Collapsed: true
        };

        $scope.productDetails = {
            selectedProduct: '',
            products: [],
            user1Quantity: 0,
            user5Quantity: 0,
            user10Quantity: 0,
            updateSelectedProduct: updateSelectedProduct,
            chosenSupport: '',
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
