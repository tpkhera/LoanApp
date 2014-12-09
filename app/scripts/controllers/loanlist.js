'use strict';

/**
 * @ngdoc function
 * @name loanAdvisorApp.controller:LoanlistCtrl
 * @description
 * # LoanlistCtrl
 * Controller of the loanAdvisorApp
 */
angular.module('loanAdvisorApp')
  .controller('LoanlistCtrl', function ($scope, $rootScope, $location, $routeParams, sharedProps) {

    $scope.loans;

    sharedProps.getLoans()
    .then(function (response) {
      $scope.loans = response.data;
    });

  	$scope.userPref = {
      principal: $rootScope.principal === undefined ? '2500000' : $rootScope.principal,
      time: $rootScope.time === undefined ? '15' : $rootScope.time
  	};

    $scope.tempPref = {
      principal: $scope.userPref.principal,
      time: $scope.userPref.time
    };

    $scope.update = function() {
      $scope.userPref.principal = $scope.tempPref.principal;
      $scope.userPref.time = $scope.tempPref.time;
    };

  	$scope.openDetails = function(loan){
      $rootScope.principal = $scope.userPref.principal;
      $rootScope.time = $scope.userPref.time;
      $rootScope.loan = loan;
      $location.path('/loanlist/' + $routeParams.loanType + '/loanId/' + loan.id);
  	};

    $scope.initial = function(bankName){
    	return bankName.charAt(0);
    };

    $scope.EMI = function(loanRate) {
      var p = $scope.userPref.principal, r = loanRate/1200, t = $scope.userPref.time*12;
      return sharedProps.calculateEMI(p, r, t);
    };
  });
