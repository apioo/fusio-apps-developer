'use strict';

var angular = require('angular');

angular.module('fusioApp.account.payment', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/payment', {
    templateUrl: 'app/account/payment/payment.html',
    controller: 'AccountPaymentCtrl'
  });
  $routeProvider.when('/account/payment/:transaction_id?', {
    templateUrl: 'app/account/payment/payment.html',
    controller: 'AccountPaymentCtrl'
  });
}])

.controller('AccountPaymentCtrl', ['$scope', '$http', '$auth', '$location', '$window', '$routeParams', 'fusio', function($scope, $http, $auth, $location, $window, $routeParams, fusio) {
  $scope.STATUS_PREPARED = 0;
  $scope.STATUS_CREATED  = 1;
  $scope.STATUS_APPROVED = 2;
  $scope.STATUS_FAILED   = 3;
  $scope.STATUS_UNKNOWN  = 4;

  $scope.provider = 'paypal';
  $scope.transactions = [];
  $scope.plans = [];
  $scope.loading = false;

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.load = function() {
    $http.get(fusio.baseUrl + 'consumer/transaction').then(function(response) {
      $scope.transactions = response.data.entry;
    });
  };

  $scope.loadPlans = function() {
    $http.get(fusio.baseUrl + 'consumer/plan').then(function(response) {
        $scope.plans = response.data.entry;
    });
  };

  $scope.prepareTransaction = function(provider, planId) {
    if ($scope.loading) {
      return;
    }

    $scope.loading = true;

    var data = {
      planId: planId,
      returnUrl: $location.absUrl() + '/{transaction_id}'
    };

    $http.post(fusio.baseUrl + 'consumer/transaction/prepare/' + provider, data).then(function(response) {
      var approvalUrl = response.data.approvalUrl;
      if (approvalUrl) {
        $window.location.href = approvalUrl;
      }

      $scope.response = response.data;
      $scope.loading = false;
    }, function(response) {
      $scope.response = response.data;
      $scope.loading = false;
    });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

  $scope.load();
  $scope.loadPlans();

  // check transaction id if available
  if ($routeParams.transaction_id) {
    $http.get(fusio.baseUrl + 'consumer/transaction/' + $routeParams.transaction_id).then(function(response) {
      $scope.transaction = response.data;
    });
  }

}]);


