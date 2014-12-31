'use strict';

/**
 * @ngdoc function
 * @name loanAdvisorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loanAdvisorApp
 */
angular.module('loanAdvisorApp')
  .controller('LoginCtrl', function ($scope, $location, $q, $mdToast, Auth) {
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.authObj = Auth;

    $scope.signIn = function () {
      if ($scope.loginForm.$valid) {

        $scope.tryLogIn().then(function (response) {
          $scope.showSimpleToast('Signed in as ' + response.password.email);
          $scope.goHome();
        }, function (error) {
          if (error.code === 'INVALID_USER') {
            $scope.createUser().then(function () {
              $scope.signIn();
            });
          } else if (error.code === 'INVALID_PASSWORD') {
            $scope.showSimpleToast('Incorrect Password!');
            $scope.user.password = '';
          } else {
            $scope.showSimpleToast('Invalid Email ID!');
            $scope.user.email = '';
            $scope.user.password = '';
          }
        });

      }
    };

  $scope.goHome = function() {
    $location.path('/home');
  };

    $scope.tryLogIn = function () {
      var deferred = $q.defer(),
        loginPromise = $scope.authObj.$authWithPassword({
          email: $scope.user.email,
          password: $scope.user.password
        });

      loginPromise.then(function (response) {
        deferred.resolve(response);
      }).catch(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    $scope.createUser = function () {
      return $scope.authObj.$createUser($scope.user.email, $scope.user.password);
    };

    $scope.showSimpleToast = function (message) {
      $mdToast.show(
        $mdToast.simple()
        .content(message)
        .position('bottom fit')
        .hideDelay(5000)
      );
    };
  })
  .factory('Auth', ['$firebaseAuth',
    function ($firebaseAuth) {
      var ref = new Firebase('https://amber-torch-5533.firebaseio.com/');
      return $firebaseAuth(ref);
  }]);
