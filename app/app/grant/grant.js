'use strict';

angular.module('fusioApp.app.grant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/app/grant', {
    templateUrl: 'app/app/grant/grant.html',
    controller: 'AppGrantCtrl'
  });
}])

.controller('AppGrantCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function($scope, $http, $uibModal, $auth, $location, fusio) {

  $scope.grants = [];

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $http.get(fusio.baseUrl + 'consumer/app/grant').then(function(response) {
    $scope.grants = response.data.entry;
  });

}]);
