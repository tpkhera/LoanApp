'use strict';

/**
 * @ngdoc function
 * @name loanAdvisorApp.controller:LoanlistCtrl
 * @description
 * # LoanlistCtrl
 * Controller of the loanAdvisorApp
 */
angular.module('loanAdvisorApp')
  .controller('LoanlistCtrl', function ($scope, $route, $routeParams) {
  	// var loanType = $routeParams.loanType;


  	$scope.loans = [
		{
		  id: 'HDFC_01',
		  name: 'HDFC',
		  rate: '10',
		  rateType: 'floating'
		},
		{
		  id: 'AXIS_01',
		  name: 'AXIS',
		  rate: '15',
		  rateType: 'fixed'
		},
		{
		  id: 'SBI_01',
		  name: 'DHFL',
		  rate: '12',
		  rateType: 'floating'
		},
		{
		  id: 'SBI_01',
		  name: 'PNB',
		  rate: '17',
		  rateType: 'fixed'
		},
		{
		  id: 'SBI_01',
		  name: 'SBI',
		  rate: '13',
		  rateType: 'floating'
		},
		{
		  id: 'HDFC_01',
		  name: 'HDFC',
		  rate: '10',
		  rateType: 'floating'
		},
		{
		  id: 'AXIS_01',
		  name: 'AXIS',
		  rate: '15',
		  rateType: 'fixed'
		},
		{
		  id: 'SBI_01',
		  name: 'DHFL',
		  rate: '12',
		  rateType: 'floating'
		},
		{
		  id: 'SBI_01',
		  name: 'PNB',
		  rate: '17',
		  rateType: 'fixed'
		},
		{
		  id: 'SBI_01',
		  name: 'SBI',
		  rate: '13',
		  rateType: 'floating'
		}
    ];

    $scope.initial = function(bankName){
    	return bankName.charAt(0);
    };

    $scope.calcEMI = function(p, r, t){
    	return p*r*(1/(1 - (1/Math.pow((1+r), t))));
    };

  });
