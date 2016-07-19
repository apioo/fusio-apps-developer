'use strict';

angular.module('fusioApp.security', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/security', {
    templateUrl: 'app/security/security.html',
    controller: 'SecurityCtrl'
  });
}])

.controller('SecurityCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', function($scope, $http, $uibModal, $auth, $location) {

  $scope.account = {};

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.update = function(account) {
    $http.put(fusio_url + 'consumer/account/change_password', account).then(function(response) {
      $scope.response = response.data;
    }, function(response) {
      $scope.response = response.data;
    });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

}]);
