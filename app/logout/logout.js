'use strict';

angular.module('fusioApp.logout', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/logout', {
        templateUrl: 'app/logout/logout.html',
        controller: 'LogoutCtrl'
    });
}])

.controller('LogoutCtrl', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {

    if ($auth.isAuthenticated()) {
        $auth.logout();
    }

    $location.url('/login');

}]);
