'use strict';

var angular = require('angular');

angular.module('fusioApp.account.contract', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/contract', {
    templateUrl: 'app/account/contract/contract.html',
    controller: 'AccountContractCtrl'
  });
}])

.controller('AccountContractCtrl', ['$scope', '$http', '$auth', '$uibModal', '$location', '$window', '$routeParams', 'fusio', function($scope, $http, $auth, $uibModal, $location, $window, $routeParams, fusio) {
  $scope.contracts = [];

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.load = function() {
    $http.get(fusio.baseUrl + 'consumer/plan/contract').then(function(response) {
      $scope.contracts = response.data.entry;
    });
  };

  $scope.showContract = function(contract) {
      var modalInstance = $uibModal.open({
          size: 'md',
          backdrop: 'static',
          templateUrl: 'app/account/contract/detail.html',
          controller: 'AccountContractDetailCtrl',
          resolve: {
              contract: function() {
                  return contract;
              }
          }
      });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

  $scope.load();

}])

.controller('AccountContractDetailCtrl', ['$scope', '$http', '$uibModalInstance', 'contract', 'fusio', function($scope, $http, $uibModalInstance, contract, fusio) {

  $scope.contract = contract;
  $scope.invoices = [];

  $http.get(fusio.baseUrl + 'consumer/plan/invoice?contractId=' + contract.id).then(function(response) {
    $scope.invoices = response.data.entry;
  });

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

}]);


