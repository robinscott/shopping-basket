'use strict';

/**
 * @ngdoc function
 * @name shoppingBasketApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingBasketApp
 */
angular.module('shoppingBasketApp')
  .controller('MainCtrl', function ($scope) {

    $scope.accordion = {
        section1Collapsed: true,
        section2Collapsed: false,
        section3Collapsed: false
    };

    $scope.product = {
      chosenProduct: ''
    };

  });
