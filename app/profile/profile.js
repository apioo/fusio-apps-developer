'use strict';

angular.module('fusioApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'app/profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function($scope, $http, $uibModal, $auth, $location, fusio) {

  $scope.account = {};
  $scope.email = null;

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.update = function(account) {
    $http.put(fusio.baseUrl + 'consumer/account', account).then(function(response) {
      $scope.response = response.data;
      $scope.load();
    });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

  $scope.load = function() {
    $http.get(fusio.baseUrl + 'consumer/account').then(function(response) {
      $scope.account = response.data;
      if (response.data.email) {
        $scope.email = response.data.email;
      }
    }, function(response) {
      $scope.response = response.data;
    });
  };

  $scope.load();

}]);
