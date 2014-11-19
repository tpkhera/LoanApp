'use strict';

describe('Controller: LoanlistCtrl', function () {

  // load the controller's module
  beforeEach(module('loanAdvisorApp'));

  var LoanlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoanlistCtrl = $controller('LoanlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
