'use strict';

angular.module('fusioApp.security', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/security', {
        templateUrl: 'app/security/security.html',
        controller: 'SecurityCtrl'
    });
}])

.controller('SecurityCtrl', ['$scope', '$http', '$uibModal', '$auth', function ($scope, $http, $uibModal, $auth) {

    if (!$auth.isAuthenticated()) {
        $location.path('/login');
        return;
    }

}]);
