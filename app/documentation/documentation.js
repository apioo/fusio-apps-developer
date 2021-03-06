'use strict'

var angular = require('angular')

angular.module('fusioApp.documentation', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/documentation/:doc?', {
      templateUrl: 'app/documentation/documentation.html',
      controller: 'DocumentationCtrl'
    })
  }])

  .controller('DocumentationCtrl', ['$scope', '$auth', '$location', '$http', '$routeParams', 'fusio', function ($scope, $auth, $location, $http, $routeParams, fusio) {
    $scope.pages = []
    $scope.page = null

    $scope.loadPages = function () {
      $http.get(fusio.baseUrl + 'consumer/page', {cache: true})
        .then(function (response) {
          $scope.pages = response.data.entry
          if (!$routeParams.doc && response.data.entry[0]) {
            $scope.loadPage(response.data.entry[0].slug)
          }
        }, function () {
        })
    }

    $scope.loadPage = function (slug) {
      $http.get(fusio.baseUrl + 'consumer/page/~' + slug, {cache: true})
        .then(function (response) {
          $scope.page = response.data
        }, function () {
        })
    }

    if ($routeParams.doc) {
      $scope.loadPage($routeParams.doc)
    }

    $scope.loadPages();
  }])
