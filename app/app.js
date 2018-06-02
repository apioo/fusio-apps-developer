'use strict';

var angular = require('angular');
var fusioApp = angular.module('fusioApp', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ui.gravatar',
  'satellizer',
  'vcRecaptcha',
  'fusioApp.account.app',
  'fusioApp.account.grant',
  'fusioApp.account.profile',
  'fusioApp.account.security',
  'fusioApp.account.subscription',
  'fusioApp.auth',
  'fusioApp.documentation',
  'fusioApp.login',
  'fusioApp.logout',
  'fusioApp.overview',
  'fusioApp.signup'
]);

require('angular-route');
require('angular-sanitize');
require('angular-animate');
require('angular-ui-bootstrap');
require('angular-highlightjs');
require('angular-recaptcha');
require('angular-gravatar');
require('satellizer');
require('./account/app/app');
require('./account/grant/grant');
require('./account/profile/profile');
require('./account/security/security');
require('./account/subscription/subscription');
require('./auth/auth');
require('./documentation/documentation');
require('./login/login');
require('./logout/logout');
require('./overview/overview');
require('./signup/signup');

fusioApp.value('version', 'v0.4');

fusioApp.provider('fusio', function() {
  var baseUrl = null;
  var documentationMenu = null;

  this.setBaseUrl = function(_baseUrl) {
    baseUrl = _baseUrl;
  };

  this.getBaseUrl = function() {
    return baseUrl;
  };

  this.setDocumentationMenu = function(_documentationMenu) {
    documentationMenu = _documentationMenu;
  };

  this.getDocumentationMenu = function() {
    return documentationMenu;
  };

  this.guessFusioEndpointUrl = function(urlRewrite) {
    var url = window.location.href;
    var removePart = function(url, sign) {
      var count = (url.match(/\//g) || []).length;
      var pos = url.lastIndexOf(sign);
      if (count > 2 && pos !== -1) {
          return url.substring(0, pos);
      }
      return url;
    };
    var parts = ['#', '?', '/', '/'];
    for (var i = 0; i < parts.length; i++) {
      url = removePart(url, parts[i]);
    }
    return url + (urlRewrite ? '/' : '/index.php/');
  };

  this.$get = function() {
    // BC workaround if the base url was not configured but the fusio_url is
    // available we use it else we guess the url
    if (baseUrl === null && typeof fusio_url !== 'undefined') {
      baseUrl = fusio_url;
    } else if (baseUrl === null) {
      baseUrl = this.guessFusioEndpointUrl(false);
    }

    return {
      baseUrl: baseUrl,
      documentationMenu: documentationMenu
    };
  };
});

fusioApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);

fusioApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

fusioApp.factory('fusioAuthenticate', ['SatellizerShared', function($auth) {
  return {
    request: function(request) {
      if ($auth.isAuthenticated()) {
        var payload = $auth.getPayload();
        if (payload && payload.sub) {
          request.headers['Authorization'] = 'Bearer ' + payload.sub;
        }
      }
      return request;
    }
  };
}]);

fusioApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('fusioAuthenticate');
}]);

fusioApp.run(function($rootScope, $window, $location, $http, $auth, version) {
  // set version
  $rootScope.isAuthenticated = $auth.isAuthenticated();
  $rootScope.userName = null;
  var payload = $auth.getPayload();
  if (payload && payload.name) {
    $rootScope.userName = payload.name;
  }
  $rootScope.version = version;
});

if (window) {
  window.fusioApp = fusioApp;
}

module.exports = fusioApp;
