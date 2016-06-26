'use strict';

angular.module('fusioApp.profile', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
    });
}])

.controller('ProfileCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', function ($scope, $http, $uibModal, $auth, $location) {

    $scope.profile = {};

    if (!$auth.isAuthenticated()) {
        $location.path('/login');
        return;
    }

    $http.get(fusio_url + 'authorization/whoami').then(function(response){
        $scope.profile = response.data;
    });


}]);
