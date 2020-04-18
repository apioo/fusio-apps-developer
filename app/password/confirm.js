'use strict'

var angular = require('angular')

angular.module('fusioApp.password.confirm', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/password/confirm/:token', {
      templateUrl: 'app/password/confirm.html',
      controller: 'PasswordConfirmCtrl'
    })
  }])

  .controller('PasswordConfirmCtrl', ['$scope', '$http', '$auth', '$routeParams', 'fusio', function ($scope, $http, $auth, $routeParams, fusio) {
    $scope.user = {
      token: $routeParams.token,
      password: '',
      passwordRepeat: '',
    }

    $scope.confirm = function (user) {
      var data = {
          token: user.token,
          newPassword: user.password
      }

      $http.put(fusio.baseUrl + 'consumer/password_reset', data)
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
