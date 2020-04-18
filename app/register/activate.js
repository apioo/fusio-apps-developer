'use strict'

var angular = require('angular')

angular.module('fusioApp.register.activate', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register/activate/:token', {
      templateUrl: 'app/register/activate.html',
      controller: 'RegisterActivateCtrl'
    })
  }])

  .controller('RegisterActivateCtrl', ['$scope', '$http', '$auth', '$routeParams', 'fusio', function ($scope, $http, $auth, $routeParams, fusio) {
    $scope.activate = function (token) {
      var data = {
        token: token
      }

      $http.post(fusio.baseUrl + 'consumer/activate', data)
        .then(function (response) {
          $scope.response = response.data
        }, function (response) {
          $scope.response = response.data
        })
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }

    $scope.activate($routeParams.token);
  }])
