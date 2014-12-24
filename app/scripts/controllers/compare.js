'use strict';

/**
 * @ngdoc function
 * @name loanAdvisorApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the loanAdvisorApp
 */
angular.module('loanAdvisorApp')
  .controller('ComparisonCtrl', function ($scope, $rootScope, $location, sharedProps) {
    $scope.loans = $rootScope.compareLoans;
    $scope.principal = $rootScope.principal;
    $scope.time = $rootScope.time;

    $scope.initial = function (bankName) {
      return bankName.charAt(0);
    };

    $scope.openDetails = function (loan) {
      $rootScope.loan = loan;
      $location.path($location.path().replace('compare', 'loanId/' + loan.id));
    };

    $scope.EMI = function (loanRate) {
      var p = $scope.principal,
        r = loanRate / 1200,
        t = $scope.time * 12;
      return sharedProps.calculateEMI(p, r, t);
    };

    $scope.netInterest = function (loanRate) {
      return $scope.EMI(loanRate) * $scope.time * 12 - $scope.principal;
    };

  });
