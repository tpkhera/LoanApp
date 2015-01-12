'use strict';

/**
 * @ngdoc function
 * @name loanAdvisorApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the loanAdvisorApp
 */
angular.module('loanAdvisorApp')
  .controller('HomeCtrl', function ($scope, $location) {
    $scope.goTo = function (category) {
      var navTo = category === 'emicalc' ? '/emicalc' : '/loanlist/' + category;
      $location.path(navTo);
    };
  });
