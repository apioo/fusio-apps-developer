'use strict'

var angular = require('angular')

angular.module('fusioApp.account.profile', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/account', {
      templateUrl: 'app/account/profile/profile.html',
      controller: 'AccountProfileCtrl'
    })
  }])

  .controller('AccountProfileCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function ($scope, $http, $uibModal, $auth, $location, fusio) {
    $scope.email = null

    if (!$auth.isAuthenticated()) {
      $location.path('/login')
      return
    }

    $scope.update = function (account) {
      $http.put(fusio.baseUrl + 'consumer/account', account).then(function (response) {
        $scope.response = response.data
        $scope.load()
      })
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }
  }])
