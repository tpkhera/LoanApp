'use strict';

/**
 * @ngdoc function
 * @name loanAdvisorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the loanAdvisorApp
 */
angular.module('loanAdvisorApp')
  .controller('LoandetailsCtrl', function ($scope, $rootScope, $routeParams, sharedProps) {
    //    var loanId = $routeParams.loanID;

    $scope.loan = $rootScope.loan;

    //    sharedProps.getLoans()
    //    .then(function (response) {
    //      $scope.loan = sharedProps.getLoanId(response.data, loanId);
    //    });

    $scope.principal = $rootScope.principal;
    $scope.time = $rootScope.time;

    $scope.initial = function (bankName) {
      return bankName.charAt(0);
    };

    $scope.EMI = function() {
      var p = $scope.principal, r = $scope.loan.rate/1200, t = $scope.time*12;
      return sharedProps.calculateEMI(p, r, t);
    };



    $scope.netInterest = function() {
      return $scope.EMI() * $scope.time * 12 - $scope.principal;
    };
  });
