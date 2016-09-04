'use strict';

angular.module('fusioApp.account.app.grant', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/app/grant', {
    templateUrl: 'app/account/app/grant/grant.html',
    controller: 'AccountAppGrantCtrl'
  });
}])

.controller('AccountAppGrantCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function($scope, $http, $uibModal, $auth, $location, fusio) {

  $scope.grants = [];

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $http.get(fusio.baseUrl + 'consumer/app/grant').then(function(response) {
    $scope.grants = response.data.entry;
  });

}]);
