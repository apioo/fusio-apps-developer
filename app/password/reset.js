'use strict'

var angular = require('angular')

angular.module('fusioApp.password.reset', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/password/reset', {
      templateUrl: 'app/password/reset.html',
      controller: 'PasswordResetCtrl'
    })
  }])

  .controller('PasswordResetCtrl', ['$scope', '$http', '$auth', 'fusio', function ($scope, $http, $auth, fusio) {
    $scope.user = {
      email: '',
      captcha: ''
    }

    $scope.reset = function (user) {
      var data = angular.copy(user)

      $http.post(fusio.baseUrl + 'consumer/password_reset', data)
        .then(function (response) {
          $scope.response = response.data
        }, function (response) {
          $scope.response = response.data
        })
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }
  }])
