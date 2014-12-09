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
  	$scope.goTo = function(category) {
  		$location.path('/loanlist/' + category);
  	};
  });
