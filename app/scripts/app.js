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
      .when('/loanlist/:loanType/loanId/:loanID', {
        templateUrl: 'views/loandetails.html',
        controller: 'LoandetailsCtrl'
      })
      .when('/loanlist/:loanType/compare', {
        templateUrl: 'views/compare.html',
        controller: 'ComparisonCtrl'
      })
      .when('/emicalc', {
        templateUrl: 'views/emicalculator.html',
        controller: 'EMIcalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('toolbar', function () {
    return {
      restrict: 'E',

      controller: function ($scope, $location, $window, $mdSidenav) {
        var path = $location.path();
        console.log(path);

        if (path.indexOf('loanId') > 0) {
          $scope.pageProps = {
            title: 'Loan Details',
            goBack: true
          };
        } else if (path.indexOf('loanlist') > 0) {
          if (path.indexOf('home') > 0) {
            $scope.pageProps = {
              title: 'Home Loans'
            };
          } else if (path.indexOf('auto') > 0) {
            $scope.pageProps = {
              title: 'Auto Loans'
            };
          } else {
            $scope.pageProps = {
              title: 'Personal Loans'
            };
          }
        } else if (path.indexOf('home') > 0) {
          $scope.pageProps = {
            title: 'Loan Smart'
          };
        } else if (path.indexOf('compare') > 0) {
          $scope.pageProps = {
            title: 'Compare Loans',
            goBack: true
          };
        } else {
          $scope.pageProps = {
            title: 'EMI Calculator',
            goBack: true
          };
        }

        $scope.toggleLeft = function () {
          $mdSidenav('left').toggle();
        };
        $scope.goTo = function (category) {
          var navTo = category === 'emicalc' ? '/emicalc' : '/loanlist/' + category;
          $location.path(navTo);
        };
        $scope.back = function() {
          $window.history.back();
        };
      },

      link: function (scope, element) {
        if (scope.pageProps.title === 'Loan Smart') {
          element.find('md-toolbar').removeClass('md-whiteframe-z1');
        }
      },

      templateUrl: 'views/partials/toolbar.html'
    };
  })
  .factory('sharedProps', ['$http', '$q',
    function ($http, $q) {
      var service = {};
      var DATA_URL = 'data/data.json';

      service.getLoans = function () {
        var deferred = $q.defer(),
          httpPromise = $http.get(DATA_URL);

        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });

        return deferred.promise;
      };

      //    service.getLoanId = function(loanList, loanId){
      //      for (var i = 0; i < loanList.length; i++){
      //        if (loanList[i].id === loanId){
      //          return loanList[i];
      //          break;
      //        }
      //      }
      //    };

      service.calculateEMI = function (p, r, t) {
        return Math.round(p * r * (1 / (1 - (1 / Math.pow((1 + r), t)))));
      };

      return service;
  }]);
