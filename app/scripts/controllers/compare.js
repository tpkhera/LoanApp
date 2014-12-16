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

    $scope.initial = function (bankName) {
      return bankName.charAt(0);
    };

    $scope.openDetails = function (loan) {
      $rootScope.loan = loan;
      $location.path($location.path().replace('compare', 'loanId/' + loan.id));
    };

    $scope.EMI = function () {
      var p = $scope.principal,
        r = $scope.loan.rate / 1200,
        t = $scope.time * 12,
        currEMI = sharedProps.calculateEMI(p, r, t),
        currIntPaybk, currPplPaybk, remPplPaybk;

      //Amortization
      for (var i = 0; i < t; i++) {
        currIntPaybk = p * r;
        currPplPaybk = currEMI - currIntPaybk;
        remPplPaybk = p - currPplPaybk;
        p = remPplPaybk;
      }


    };
  });
