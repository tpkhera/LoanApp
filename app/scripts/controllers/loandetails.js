'use strict';

/**
 * @ngdoc function
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

    $scope.EMI = function (time) {
      var p = $scope.principal,
        r = $scope.loan.rate / 1200,
        t = ((time) || $scope.time) * 12;
      return sharedProps.calculateEMI(p, r, t);
    };

    $scope.netInterest = function (time) {
      time = (time) || $scope.time;
      return $scope.EMI(time) * time * 12 - $scope.principal;
    };

    $scope.netPayable = function () {
      if ($scope.loan.processingFee) {
        return parseInt($scope.netInterest()) + parseInt($scope.principal) + parseInt($scope.loan.processingFee * $scope.principal / 100);
      }

      return parseInt($scope.netInterest()) + parseInt($scope.principal);
    };

    $scope.events = {
      draw: function (data) {
        if (data.type === 'label' && data.axis === 'x') {
          data.element.attr({
            dx: data.x + data.space / 2
          });
        }
        if(data.type === 'bar') {
          data.group.append(new Chartist.Svg('text', {
            x: data.x2 - 10,
            y: data.y2 - 10,
          }, 'ct-text').text(Math.round(data.value / 100000) + ' L'));
        }
      }
    };

    $scope.barData = {
      labels: [0, 0, 0, 0, 0],
      series: [[0, 0, 0, 0, 0]]
    };

    $scope.barOptions = {
      axisX: {
        showGrid: false
      },
      axisY: {
        labelInterpolationFnc: function (value) {
          return (value / 100000) + 'L';
        }
      }
    };

    var getTimes = function (t) {
      t = parseInt(((t) || $scope.time));
      if (t === 5) {
        return [t, t + 5, t + 10, t + 15, t + 20];
      } else if (t === 10) {
        return [t - 5, t, t + 5, t + 10, t + 15];
      } else {
        return [t - 10, t - 5, t, t + 5, t + 10];
      }
    };

    angular.forEach(getTimes(), function(value) {
      console.log(value);
      $scope.barData.series.forEach(function(serie) {
        serie.push($scope.netInterest(value));
        serie.splice(0,1);
      });
      $scope.barData.labels.push(value + ' yrs');
      $scope.barData.labels.splice(0,1);
    });

    $scope.Amortize = function () {
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
