'use strict'

var angular = require('angular')

angular.module('fusioApp.login', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    })
  }])

  .controller('LoginCtrl', ['$scope', '$http', '$auth', '$location', '$route', '$rootScope', 'SatellizerConfig', function ($scope, $http, $auth, $location, $route, $rootScope, SatellizerConfig) {
    $scope.user = {
      username: '',
      password: ''
    }

    if ($auth.isAuthenticated()) {
      $location.path('/profile')
      return
    }

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
    }

    $scope.isConfigured = function (provider) {
      return SatellizerConfig.providers[provider] && SatellizerConfig.providers[provider].clientId
    }

    $scope.closeResponse = function () {
      $scope.response = null
    }

    $scope.login = function (user) {
      $auth.login(JSON.stringify(user))
        .then(function () {
          $rootScope.isAuthenticated = $auth.isAuthenticated()
          $rootScope.userName = null
          var payload = $auth.getPayload()
          if (payload && payload.name) {
            $rootScope.userName = payload.name
          }

          var params = $location.search()
          if (params && params.auth) {
            var allowedParams = {
              responseType: 'response_type',
              clientId: 'client_id',
              redirectUri: 'redirect_uri',
              scope: 'scope',
              state: 'state'
            }
            var data = JSON.parse(atob(params.auth))
            var parts = []
            for (var key in allowedParams) {
              if (data[key]) {
                parts.push(allowedParams[key] + '=' + encodeURIComponent(data[key]))
              }
            }

            $location.url('/auth?' + parts.join('&'))
          } else {
            $route.reload()
          }
        })
        .catch(function (response) {
          $scope.user.password = ''
          $scope.response = response.data
        })
    }
  }])
