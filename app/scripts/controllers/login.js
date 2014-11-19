'use strict';

/**
 * @ngdoc function
 * @name loanAdvisorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loanAdvisorApp
 */
angular.module('loanAdvisorApp')
  .controller('LoginCtrl', function ($scope, $location) {
    $scope.user = {

    };

    $scope.addUser = function(user) {
    	$location.path('/home');
    };
  });