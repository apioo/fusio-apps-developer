'use strict';

var fusioApp = angular.module('fusioApp', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'satellizer',
    'noCAPTCHA',
    'fusioApp.app.developer',
    'fusioApp.app.grant',
    'fusioApp.auth',
    'fusioApp.login',
    'fusioApp.profile',
    'fusioApp.security',
    'fusioApp.signup'
]);

fusioApp.value('version', 'v0.1');

fusioApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    otherwise({
        redirectTo: '/login'
    });
}]);

fusioApp.factory('fusioAuthenticate', ['SatellizerShared', function($auth) {
    return {
        request: function(request){
            if ($auth.isAuthenticated()) {
                var payload = $auth.getPayload();
                if (payload && payload.jti) {
                    request.headers['Authorization'] = 'Bearer ' + payload.jti;
                }
            }
            return request;
        }
    };
}]);

fusioApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('fusioAuthenticate');
}]);

fusioApp.run(function ($rootScope, $window, $location, $http, version) {
    /*
    var token = $window.sessionStorage.getItem('fusio_access_token');
    if (token) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        angular.element(document.querySelector('body')).removeClass('fusio-hidden');
    } else {
        $location.path('/login');
    }
    */

    // set version
    $rootScope.version = version;
});

/**
 * Simple helper function to guess the API endpoint url
 */
function guessFusioEndpointUrl() {
    var url = window.location.href;
    var removePart = function(url, sign) {
        var count = (url.match(/\//g) || []).length;
        var pos = url.lastIndexOf(sign);
        if (count > 2 && pos !== -1) {
            return url.substring(0, pos);
        }
        return url;
    };
    var parts = ['#', '?', '/'];
    for (var i = 0; i < parts.length; i++) {
        url = removePart(url, parts[i]);
    }
    return url + '/index.php/';
}

if (typeof fusio_url === 'undefined') {
    var fusio_url = guessFusioEndpointUrl();
}
