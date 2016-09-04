'use strict';

angular.module('fusioApp.account.security', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/security', {
    templateUrl: 'app/account/security/security.html',
    controller: 'AccountSecurityCtrl'
  });
}])

.controller('AccountSecurityCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function($scope, $http, $uibModal, $auth, $location, fusio) {

  $scope.account = {};

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.update = function(account) {
    $http.put(fusio.baseUrl + 'consumer/account/change_password', account).then(function(response) {
      $scope.response = response.data;
    }, function(response) {
      $scope.response = response.data;
    });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

}]);
