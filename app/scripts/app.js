'use strict';

/**
 * @ngdoc overview
 * @name loanAdvisorApp
 * @description
 * # loanAdvisorApp
 *
 * Main module of the application.
 */
angular
  .module('loanAdvisorApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/loanlist/:loanType', {
        templateUrl: 'views/loanlist.html',
        controller: 'LoanlistCtrl'
      })
      .when('/loanlist/:loanType/loan/:loanID', {
          templateUrl: 'views/loandetails.html',
          controller: 'LoandetailsCtrl'
      })
      .when('/loanlist/:loanType/compare/:loanIDs', {
          templateUrl: 'views/comparison.html',
          controller: 'ComparisonCtrl'
      })      
      .when('/emicalc', {
        templateUrl: 'views/emicalculator.html',
        controller: 'EMIcalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
