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
        self.selectedProduct = null;
        self.chosenSupport = 0;
        self.userQuantity = 0;
        self.userSubTotal = 0;
        self.userSubTotalUnitcost = 0;


        self.calculateUnitcost = function (selectedProduct, quantity) {
            if (selectedProduct) {
                return selectedProduct.unitcost * quantity;
            }
        };

        self.calculateCostPerUser = function (selectedProduct, discount) {
            if (selectedProduct) {
                discount = (100 - discount) / 100;
                return selectedProduct.unitcost * discount;
            }
        };

        self.calculateSubTotal = function (selectedProduct, discount, quantity, userQuantity) {
            if (selectedProduct) {
                discount = (100 - discount) / 100;
                var discountedUnit = selectedProduct.unitcost * discount;
                return (discountedUnit * quantity) * userQuantity;
            }
        };

        self.calculateDiscountAmount = function (discount, subTotalUnitcost) {
            return (discount / 100) * subTotalUnitcost;
        };

        self.calculateSupportYearSubtotal = function (chosenSupport, userLicense, userQuantity) {
            return (chosenSupport * userLicense) * userQuantity;
        };

        self.updateSelectedProduct = function () {
            self.selectedProduct.userLicensePacks = {
                pack1: {
                    amount: 1,
                    unitCost: self.calculateUnitcost(self.selectedProduct, 1),
                    discountPack: 0,
                    costPerUser: self.selectedProduct.unitcost,
                    updateQuantity: function () {

                        // Calculate basket subtotal
                        this.userSubTotal = self.calculateSubTotal(self.selectedProduct, 0, this.userQuantity, 1);
                        self.userSubTotalUnitcost = self.calculateUnitcost(self.selectedProduct, 1) * this.userQuantity;

                        self.userDiscount = 0;
                        self.userQuantity = this.userQuantity;
                        self.userSubTotal = this.userSubTotal;
                        self.userLicense = 1;
                    }
                },
                pack5: {
                    amount: 5,
                    unitCost: self.calculateUnitcost(self.selectedProduct, 5),
                    discountPack: self.selectedProduct.discount5pack,
                    costPerUser: self.calculateCostPerUser(self.selectedProduct, self.selectedProduct.discount5pack),
                    updateQuantity: function () {

                        // Calculate basket subtotal
                        this.userSubTotal = self.calculateSubTotal(self.selectedProduct, self.selectedProduct.discount5pack, this.userQuantity, 5);
                        self.userSubTotalUnitcost = self.calculateUnitcost(self.selectedProduct, 5) * this.userQuantity;

                        // Calculate summary discount amount
                        self.userDiscountAmount = self.calculateDiscountAmount(self.selectedProduct.discount5pack, self.userSubTotalUnitcost);

                        self.userDiscount = self.selectedProduct.discount5pack;
                        self.userQuantity = this.userQuantity;
                        self.userSubTotal = this.userSubTotal;
                        self.userLicense = 5;
                    }
                },
                pack10: {
                    amount: 10,
                    unitCost: self.calculateUnitcost(self.selectedProduct, 10),
                    discountPack: self.selectedProduct.discount10pack,
                    costPerUser: self.calculateCostPerUser(self.selectedProduct, self.selectedProduct.discount10pack),
                    updateQuantity: function () {

                        // Calculate basket subtotal
                        this.userSubTotal = self.calculateSubTotal(self.selectedProduct, self.selectedProduct.discount10pack, this.userQuantity, 10);
                        self.userSubTotalUnitcost = self.calculateUnitcost(self.selectedProduct, 10) * this.userQuantity;

                        // Calculate summary discount amount
                        self.userDiscountAmount = self.calculateDiscountAmount(self.selectedProduct.discount10pack, self.userSubTotalUnitcost);

                        self.userDiscount = self.selectedProduct.discount10pack;
                        self.userQuantity = this.userQuantity;
                        self.userSubTotal = this.userSubTotal;
                        self.userLicense = 10;
                    }
                }
            };
            self.selectedProduct.userSupport = {
                support1: {
                    year: 1,
                    amount: self.selectedProduct.support1year,
                    updateSupport: function () {
                        self.supportYearSubtotal = self.calculateSupportYearSubtotal(self.chosenSupport, self.userLicense, self.userQuantity);
                        self.supportYear = 1;
                    }
                },
                support2: {
                    year: 2,
                    amount: self.selectedProduct.support2year,
                    updateSupport: function () {
                        self.supportYearSubtotal = self.calculateSupportYearSubtotal(self.chosenSupport, self.userLicense, self.userQuantity);
                        self.supportYear = 2;
                    }
                },
                support3: {
                    year: 3,
                    amount: self.selectedProduct.support3year,
                    updateSupport: function () {
                        self.supportYearSubtotal = self.calculateSupportYearSubtotal(self.chosenSupport, self.userLicense, self.userQuantity);
                        self.supportYear = 3;
                    }
                }
            }
        };

        self.updateTotal = function () {
            var subtotal = self.userSubTotalUnitcost;
            if (self.userDiscountAmount) {
                subtotal = subtotal - self.userDiscountAmount;
            }
            if (self.supportYearSubtotal) {
                subtotal = subtotal + self.supportYearSubtotal;
            }
            return subtotal;
        };

        $http.get('scripts/prices.json').
            then(function (response) {
                self.products = response.data;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    })
;
