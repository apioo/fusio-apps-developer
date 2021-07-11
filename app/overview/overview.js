'use strict'

var angular = require('angular')

angular.module('fusioApp.overview', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/overview/overview.html',
      controller: 'OverviewCtrl'
    })
  }])

  .controller('OverviewCtrl', ['$scope', '$auth', '$location', '$http', 'fusio', function ($scope, $auth, $location, $http, fusio) {
    $scope.page = null

    $scope.loadPage = function () {
      $http.get(fusio.baseUrl + 'consumer/page/~overview', {cache: true})
        .then(function (response) {
            $scope.page = response.data
        }, function () {
        })
    }

    $scope.loadPage();
  }])
