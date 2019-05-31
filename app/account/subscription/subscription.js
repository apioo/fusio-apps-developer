'use strict'

var angular = require('angular')

angular.module('fusioApp.account.subscription', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/account/subscription', {
      templateUrl: 'app/account/subscription/subscription.html',
      controller: 'AccountSubscriptionCtrl'
    })
  }])

  .controller('AccountSubscriptionCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function ($scope, $http, $uibModal, $auth, $location, fusio) {
    $scope.subscriptions = []

    if (!$auth.isAuthenticated()) {
      $location.path('/login')
      return
    }

    $scope.load = function () {
      $http.get(fusio.baseUrl + 'consumer/subscription').then(function (response) {
        $scope.subscriptions = response.data.entry
      })
    }

    $scope.createSubscription = function () {
      var modalInstance = $uibModal.open({
        size: 'md',
        backdrop: 'static',
        templateUrl: 'app/account/subscription/create.html',
        controller: 'AccountSubscriptionCreateCtrl'
      })

      modalInstance.result.then(function (response) {
        $scope.load()
      }, function () {
      })
    }

    $scope.showSubscription = function (subscription) {
      $uibModal.open({
        size: 'md',
        backdrop: 'static',
        templateUrl: 'app/account/subscription/detail.html',
        controller: 'AccountSubscriptionDetailCtrl',
        resolve: {
          subscription: function () {
            return subscription
          }
        }
      })
    }

    $scope.deleteSubscription = function (subscription) {
      if (confirm('Do you really want to delete the subscription?')) {
        $http.delete(fusio.baseUrl + 'consumer/subscription/' + subscription.id).then(function (response) {
          $scope.load()
        })
      }
    }

    $scope.load()
  }])

  .controller('AccountSubscriptionCreateCtrl', ['$scope', '$http', '$uibModalInstance', 'fusio', function ($scope, $http, $uibModalInstance, fusio) {
    $scope.subscription = {
      event: '',
      endpoint: ''
    }
    $scope.events = []

    $http.get(fusio.baseUrl + 'consumer/event').then(function (response) {
      $scope.events = response.data.entry
    })

    $scope.create = function (subscription) {
      var data = angular.copy(subscription)

      // filter scopes
      if (data.scopes && angular.isArray(data.scopes)) {
        data.scopes = data.scopes.filter(function (value) {
          return value !== null && value !== undefined
        })
      }

      $http.post(fusio.baseUrl + 'consumer/subscription', data).then(function (response) {
        $scope.response = response.data
        if (response.data.success === true) {
          $uibModalInstance.close()
        }
      }, function (response) {
        $scope.response = response.data
      })
    }

    $scope.close = function () {
      $uibModalInstance.dismiss('cancel')
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }
  }])

  .controller('AccountSubscriptionDetailCtrl', ['$scope', '$http', '$uibModalInstance', 'subscription', 'fusio', function ($scope, $http, $uibModalInstance, subscription, fusio) {
    $scope.subscription = subscription

    $http.get(fusio.baseUrl + 'consumer/subscription/' + subscription.id).then(function (response) {
      $scope.subscription = response.data
    })

    $scope.close = function () {
      $uibModalInstance.dismiss('cancel')
    }
  }])
