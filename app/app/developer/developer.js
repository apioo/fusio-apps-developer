'use strict';

angular.module('fusioApp.app.developer', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/app/developer', {
        templateUrl: 'app/app/developer/developer.html',
        controller: 'AppDeveloperCtrl'
    });
}])

.controller('AppDeveloperCtrl', ['$scope', '$http', '$uibModal', '$auth', function ($scope, $http, $uibModal, $auth) {

    $scope.apps = [];

    if (!$auth.isAuthenticated()) {
        $location.path('/login');
        return;
    }

    $http.get(fusio_url + 'consumer/app/developer').then(function(response){
        $scope.apps = response.data.entry;
    });

    $scope.openCreateDialog = function(){
        var modalInstance = $uibModal.open({
            size: 'lg',
            backdrop: 'static',
            templateUrl: 'app/app/developer/create.html',
            controller: 'AppDeveloperCreateCtrl'
        });

        modalInstance.result.then(function(response){
            $scope.response = response;
            $scope.load();
        }, function(){
        });
    };

}])

.controller('AppDeveloperCreateCtrl', ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance){



}]);

