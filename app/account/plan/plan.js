'use strict'

var angular = require('angular')

angular.module('fusioApp.account.plan', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/account/plan', {
      templateUrl: 'app/account/plan/plan.html',
      controller: 'AccountPlanCtrl'
    })
  }])

  .controller('AccountPlanCtrl', ['$scope', '$http', '$auth', '$location', '$window', 'fusio', function ($scope, $http, $auth, $location, $window, fusio) {

    $scope.plans = []
    $scope.loading = false

    if (!$auth.isAuthenticated()) {
      $location.path('/login')
      return
    }

    $scope.load = function () {
      $http.get(fusio.baseUrl + 'consumer/plan').then(function (response) {
        $scope.plans = response.data.entry
      })
    }

    $scope.billingPortal = function () {
      $http.post(fusio.baseUrl + 'consumer/payment/' + fusio.paymentProvider + '/portal', null).then(function (response) {
        var redirectUrl = response.data.redirectUrl;
        if (redirectUrl) {
          $window.location.href = redirectUrl
        }
      })
    }

    $scope.checkout = function (plan) {
      var data = {
        planId: plan.id,
        returnUrl: $location.absUrl()
      }

      $http.post(fusio.baseUrl + 'consumer/payment/' + fusio.paymentProvider + '/checkout', data).then(function (response) {
        var approvalUrl = response.data.approvalUrl
        if (approvalUrl) {
          $window.location.href = approvalUrl
        }

        $scope.response = response.data
        $scope.loading = false
      }, function (response) {
        $scope.response = response.data
        $scope.loading = false
      })
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }

    $scope.load()
  }])
