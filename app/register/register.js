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

    $scope.recaptchaEnabled = fusio.recaptchaEnabled;

    $scope.register = function (user) {
      var data = angular.copy(user)
      delete data.passwordRepeat

      if (!fusio.recaptchaEnabled) {
        delete data.captcha
      }

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

    $scope.isRegisterDisabled = function() {
      if ($scope.user.name === '') {
        return true;
      }
      if ($scope.user.email === '') {
        return true;
      }
      if ($scope.user.password === '') {
        return true;
      }
      if ($scope.user.password !== $scope.user.passwordRepeat) {
        return true;
      }
      if (fusio.recaptchaEnabled) {
        if ($scope.user.captcha === '') {
          return true;
        }
      }
      return false;
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }
  }])
