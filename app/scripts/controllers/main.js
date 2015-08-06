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
        visible: true,
        toggle: function() {
            return this.visible = !this.visible;
        }
    };

    $scope.product = {
      chosenProduct: ''
    };

  });
