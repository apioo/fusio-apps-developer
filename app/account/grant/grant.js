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

  $http.get(fusio.baseUrl + 'consumer/app/grant').then(function(response) {
    $scope.grants = response.data.entry;
  });

}]);
