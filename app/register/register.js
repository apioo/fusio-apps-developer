'use strict'

var angular = require('angular')

angular.module('fusioApp.register', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
      templateUrl: 'app/register/register.html',
      controller: 'RegisterCtrl'
    })
  }])

  .controller('RegisterCtrl', ['$scope', '$http', '$auth', 'fusio', function ($scope, $http, $auth, fusio) {
    $scope.user = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      captcha: ''
    }

    $scope.register = function (user) {
      var data = angular.copy(user)
      delete data.passwordRepeat

      $http.post(fusio.baseUrl + 'consumer/register', data)
        .then(function (response) {
          $scope.response = response.data
        }, function (response) {
          $scope.user.password = ''
          $scope.user.passwordRepeat = ''
          $scope.user.captcha = ''
          $scope.response = response.data
        })
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }
  }])
