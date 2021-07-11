'use strict'

var angular = require('angular')
var fusioApp = angular.module('fusioApp', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ui.gravatar',
  'satellizer',
  'vcRecaptcha',
  'fusioApp.account.app',
  'fusioApp.account.contract',
  'fusioApp.account.grant',
  'fusioApp.account.invoice',
  'fusioApp.account.plan',
  'fusioApp.account.profile',
  'fusioApp.account.security',
  'fusioApp.account.subscription',
  'fusioApp.auth',
  'fusioApp.documentation',
  'fusioApp.login',
  'fusioApp.logout',
  'fusioApp.overview',
  'fusioApp.password.confirm',
  'fusioApp.password.reset',
  'fusioApp.register',
  'fusioApp.register.activate'
])

require('angular-route')
require('angular-sanitize')
require('angular-animate')
require('angular-ui-bootstrap')
require('angular-highlightjs')
require('angular-recaptcha')
require('angular-gravatar')
require('satellizer')
require('./account/app/app')
require('./account/contract/contract')
require('./account/grant/grant')
require('./account/invoice/invoice')
require('./account/plan/plan')
require('./account/profile/profile')
require('./account/security/security')
require('./account/subscription/subscription')
require('./auth/auth')
require('./documentation/documentation')
require('./login/login')
require('./logout/logout')
require('./overview/overview')
require('./password/reset')
require('./password/confirm')
require('./register/activate')
require('./register/register')

fusioApp.value('version', 'v1.0')

fusioApp.provider('fusio', function () {
  var baseUrl = null

  this.setBaseUrl = function (_baseUrl) {
    baseUrl = _baseUrl
  }

  this.getBaseUrl = function () {
    return baseUrl
  }

  this.guessFusioEndpointUrl = function (urlRewrite) {
    var url = window.location.href
    var removePart = function (url, sign) {
      var count = (url.match(/\//g) || []).length
      var pos = url.lastIndexOf(sign)
      if (count > 2 && pos !== -1) {
        return url.substring(0, pos)
      }
      return url
    }
    var parts = ['#', '?', '/', '/']
    for (var i = 0; i < parts.length; i++) {
      url = removePart(url, parts[i])
    }
    return url + (urlRewrite ? '/' : '/index.php/')
  }

  this.$get = function () {
    // BC workaround if the base url was not configured but the fusio_url is
    // available we use it else we guess the url
    if (baseUrl === null && typeof fusio_url !== 'undefined') {
      baseUrl = fusio_url
    } else if (baseUrl === null) {
      baseUrl = this.guessFusioEndpointUrl(false)
    }

    return {
      baseUrl: baseUrl
    }
  }
})

fusioApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  })
}])

fusioApp.factory('fusioAuthenticate', ['SatellizerShared', function ($auth) {
  return {
    request: function (request) {
      if ($auth.isAuthenticated()) {
        var token = $auth.getToken()
        if (token) {
          request.headers['Authorization'] = 'Bearer ' + token
        }
      }
      return request
    }
  }
}])

fusioApp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('fusioAuthenticate')
}])

fusioApp.run(function ($rootScope, $window, $location, $http, $auth, version) {
  // set version
  $rootScope.isAuthenticated = $auth.isAuthenticated()
  $rootScope.userName = null
  var payload = $auth.getPayload()
  if (payload && payload.name) {
    $rootScope.userName = payload.name
  }
  $rootScope.version = version
})

if (window) {
  window.fusioApp = fusioApp
}

module.exports = fusioApp
