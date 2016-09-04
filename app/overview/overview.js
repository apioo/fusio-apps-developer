'use strict';

angular.module('fusioApp.overview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/overview/overview.html',
    controller: 'OverviewCtrl'
  });
}])

.controller('OverviewCtrl', ['$scope', '$auth', '$location', function($scope, $auth, $location) {

}]);
