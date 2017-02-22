'use strict';

angular.module('fusioApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth', {
    templateUrl: 'app/auth/grant.html',
    controller: 'AuthCtrl'
  });
}])

.controller('AuthCtrl', ['$scope', '$http', '$auth', '$location', '$window', 'fusio', function($scope, $http, $auth, $location, $window, fusio) {

  var params = $location.search();
  var responseType = params.response_type;
  var clientId = params.client_id;
  var redirectUri = params.redirect_uri;
  var scope = params.scope;
  var state = params.state;

  if (responseType != 'token' && responseType != 'code') {
    $scope.error = 'Invalid response type';
  } else if (!clientId) {
    $scope.error = 'Client id missing';
  } else if (!scope) {
    $scope.error = 'Scope missing';
  } else {
    if (!$auth.isAuthenticated()) {
      var data = {
        responseType: responseType,
        clientId: clientId,
        redirectUri: redirectUri,
        scope: scope,
        state: state
      };
      var auth = btoa(JSON.stringify(data));
      $location.url('/login?auth=' + auth);
      return;
    }

    $http.get(fusio.baseUrl + 'consumer/app/meta?client_id=' + encodeURIComponent(clientId) + '&scope=' + encodeURIComponent(scope)).then(function(response) {
      $scope.app = response.data;
    }, function(response) {
      $scope.error = 'Could not request app informations';
    });
  }

  $scope.submitAccess = function(allow) {
    var data = {
      responseType: responseType,
      clientId: clientId,
      redirectUri: redirectUri,
      scope: scope,
      state: state,
      allow: !!allow
    };

    $scope.error = null;
    $scope.info = null;

    $http.post(fusio.baseUrl + 'consumer/authorize', data).then(function(response) {
      if (response.data.redirectUri === '' || response.data.redirectUri == '#') {
        if (allow === 0) {
          $scope.info = 'The access was denied. There is nothing more todo here.';
        }

        $scope.response = response.data;
      } else {
        $window.location.href = response.data.redirectUri;
      }
    }, function(response) {
      $scope.error = response.data.message;
    });
  };

}]);
