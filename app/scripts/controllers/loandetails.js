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

  });
