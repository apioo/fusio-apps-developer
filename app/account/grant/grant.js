'use strict';

var angular = require('angular');

angular.module('fusioApp.account.grant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/grant', {
    templateUrl: 'app/account/grant/grant.html',
    controller: 'AccountGrantCtrl'
  });
}])

.controller('AccountGrantCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function($scope, $http, $uibModal, $auth, $location, fusio) {

  $scope.grants = [];

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.load = function() {
    $http.get(fusio.baseUrl + 'consumer/grant').then(function(response) {
      $scope.grants = response.data.entry;
    });
  };

  $scope.deleteGrant = function(grant) {
    if (confirm('Do you really want to delete the grant?')) {
      $http.delete(fusio.baseUrl + 'consumer/grant/' + grant.id).then(function(response) {
        $scope.load();
      });
    }
  };

  $scope.load();

}]);
