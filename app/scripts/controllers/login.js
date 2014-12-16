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
      email: '',
      password: ''
    };

    $scope.SignedUp = false;
    //
    //    $scope.changeForm = function() {
    //      $scope.SignedUp = $scope.SignedUp === 0 ? 1 : 0;
    //      console.log($scope.SignedUp);
    //      $location.path('/');
    //    };

    $scope.signIn = function (user) {
      if ($scope.loginForm.$valid) {
        $location.path('/home');
      }
    };
  });
