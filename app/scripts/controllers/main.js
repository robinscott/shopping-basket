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

        var self = this;

        // Accordion
        self.section1Collapsed = false;
        self.section2Collapsed = true;
        self.section3Collapsed = true;

        // Product
        self.products = [];
        self.selectedProduct = '';
        self.currentProduct = {};
        self.chosenSupport = '';
        self.user1Quantity = 0;
        self.user5Quantity = 0;
        self.user10Quantity= 0;


        self.calculateUnitcost = function (quantity) {
            if (self.currentProduct) {
                return self.currentProduct.unitcost * quantity;
            }
        };

        self.calculateCostPerUser = function (discount) {
            if (self.currentProduct) {
                discount = (100 - discount) / 100;
                return self.currentProduct.unitcost * discount;
            }
        };

        self.calculateTotal = function (discount, quantity, userQuantity) {
            if (self.currentProduct) {
                discount = (100 - discount) / 100;
                var discountedUnit = self.currentProduct.unitcost * discount;
                return (discountedUnit * quantity) * userQuantity;
            }
        };

        self.checkQuantityChosen = function () {
            return self.user1Quantity > 0 || self.user5Quantity > 0 || self.user10Quantity > 0;
        };

        self.updateSelectedProduct = function () {
            for (var i = 0; i < self.products.length; i++) {
                if (self.products[i].name === self.selectedProduct) {
                    self.currentProduct = self.products[i];

                    // Calculate unit cost for license packs
                    self.currentProduct.userLicensePacks = [1, 5, 10];
                    self.currentProduct.user1unitcost = self.calculateUnitcost(self.currentProduct.userLicensePacks[0]);
                    self.currentProduct.user5unitcost = self.calculateUnitcost(self.currentProduct.userLicensePacks[1]);
                    self.currentProduct.user10unitcost = self.calculateUnitcost(self.currentProduct.userLicensePacks[2]);

                    // Calculate cost per user for license packs
                    self.currentProduct.discount1pack = 0;
                    self.currentProduct.user1costPerUser = self.calculateCostPerUser(self.currentProduct.discount1pack);
                    self.currentProduct.user5costPerUser = self.calculateCostPerUser(self.currentProduct.discount5pack);
                    self.currentProduct.user10costPerUser = self.calculateCostPerUser(self.currentProduct.discount10pack);

                    // Calculate sub total
                    self.currentProduct.user1subTotal = function () {
                        return self.calculateTotal(self.currentProduct.discount1pack, self.user1Quantity, self.currentProduct.userLicensePacks[0]);
                    };
                    self.currentProduct.user5subTotal = function () {
                        return self.calculateTotal(self.currentProduct.discount5pack, self.user5Quantity, self.currentProduct.userLicensePacks[1]);
                    };
                    self.currentProduct.user10subTotal = function () {
                        return self.calculateTotal(self.currentProduct.discount10pack, self.user10Quantity, self.currentProduct.userLicensePacks[2]);
                    };

                    // Summary - calculate subtotal unit cost
                    self.currentProduct.user1subTotalUnitcost = function() {
                        return self.currentProduct.user1unitcost * self.user1Quantity;
                    };

                    self.currentProduct.user5subTotalUnitcost = function() {
                        return self.currentProduct.user5unitcost * self.user5Quantity;
                    };

                    self.currentProduct.user10subTotalUnitcost = function() {
                        return self.currentProduct.user10unitcost * self.user10Quantity;
                    };

                    // Summary - calculate discount amount
                    self.currentProduct.user5discountAmount = function() {
                        var subTotal = self.currentProduct.user5unitcost * self.user5Quantity;
                        return (self.currentProduct.discount5pack / 100) * subTotal;
                    };

                    self.currentProduct.user10discountAmount = function() {
                        var subTotal = self.currentProduct.user10unitcost * self.user10Quantity;
                        return (self.currentProduct.discount10pack / 100) * subTotal;
                    };

                    self.currentProduct.support1YearSubtotal = function() {
                        return self.currentProduct.support1year * self.user1Quantity;
                    };

                    self.currentProduct.support5YearSubtotal = function() {
                        return self.currentProduct.support5year * self.user5Quantity;
                    };

                    self.currentProduct.support10YearSubtotal = function() {
                        return self.currentProduct.support10year * self.user10Quantity;
                    };

                }
            }
        };

        $http.get('scripts/prices.json').
            then(function (response) {
                self.products = response.data;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    });
