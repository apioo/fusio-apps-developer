'use strict'

var angular = require('angular')

angular.module('fusioApp.account.app', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/account/app', {
      templateUrl: 'app/account/app/app.html',
      controller: 'AccountAppCtrl'
    })
  }])

  .controller('AccountAppCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function ($scope, $http, $uibModal, $auth, $location, fusio) {
    $scope.apps = []

    if (!$auth.isAuthenticated()) {
      $location.path('/login')
      return
    }

    $scope.load = function () {
      $http.get(fusio.baseUrl + 'consumer/app').then(function (response) {
        $scope.apps = response.data.entry
      })
    }

    $scope.createApp = function () {
      var modalInstance = $uibModal.open({
        size: 'md',
        backdrop: 'static',
        templateUrl: 'app/account/app/create.html',
        controller: 'AccountAppCreateCtrl'
      })

      modalInstance.result.then(function (response) {
        $scope.load()
      }, function () {
      })
    }

    $scope.showApp = function (app) {
      var modalInstance = $uibModal.open({
        size: 'md',
        backdrop: 'static',
        templateUrl: 'app/account/app/detail.html',
        controller: 'AccountAppDetailCtrl',
        resolve: {
          app: function () {
            return app
          }
        }
      })
    }

    $scope.deleteApp = function (app) {
      if (confirm('Do you really want to delete the app?')) {
        $http.delete(fusio.baseUrl + 'consumer/app/' + app.id).then(function (response) {
          $scope.load()
        })
      }
    }

    $scope.load()
  }])

  .controller('AccountAppCreateCtrl', ['$scope', '$http', '$uibModalInstance', 'fusio', function ($scope, $http, $uibModalInstance, fusio) {
    $scope.app = {
      name: '',
      url: '',
      scopes: []
    }
    $scope.scopes = []

    $http.get(fusio.baseUrl + 'consumer/scope').then(function (response) {
      $scope.scopes = response.data.entry
    })

    $scope.create = function (app) {
      var data = angular.copy(app)

      // filter scopes
      if (data.scopes && angular.isArray(data.scopes)) {
        data.scopes = data.scopes.filter(function (value) {
          return value !== null && value !== undefined
        })
      }

      $http.post(fusio.baseUrl + 'consumer/app', data).then(function (response) {
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

  .controller('AccountAppDetailCtrl', ['$scope', '$http', '$uibModalInstance', 'app', 'fusio', function ($scope, $http, $uibModalInstance, app, fusio) {
    $scope.app = app

    $http.get(fusio.baseUrl + 'consumer/app/' + app.id).then(function (response) {
      $scope.app = response.data
    })

    $scope.close = function () {
      $uibModalInstance.dismiss('cancel')
    }
  }])
