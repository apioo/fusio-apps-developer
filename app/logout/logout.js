'use strict';

var angular = require('angular');

angular.module('fusioApp.logout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logout', {
    templateUrl: 'app/logout/logout.html',
    controller: 'LogoutCtrl'
  });
}])

.controller('LogoutCtrl', ['$scope', '$auth', '$location', '$rootScope', function($scope, $auth, $location, $rootScope) {

  if ($auth.isAuthenticated()) {
    $auth.logout();
    $rootScope.isAuthenticated = $auth.isAuthenticated();
    $rootScope.userName = null;
  }

  $location.url('/login');

}]);
