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

    $scope.load = function(){
        $http.get(fusio_url + 'consumer/app/developer').then(function(response){
            $scope.apps = response.data.entry;
        });
    };

    $scope.createApp = function(){
        var modalInstance = $uibModal.open({
            size: 'lg',
            backdrop: 'static',
            templateUrl: 'app/app/developer/create.html',
            controller: 'AppDeveloperCreateCtrl'
        });

        modalInstance.result.then(function(response){
            $scope.response = response.data;
            $scope.load();
        }, function(){
        });
    };

    $scope.showApp = function(app){
        var modalInstance = $uibModal.open({
            size: 'lg',
            backdrop: 'static',
            templateUrl: 'app/app/developer/detail.html',
            controller: 'AppDeveloperDetailCtrl',
            resolve: {
                app: function(){
                    return app;
                }
            }
        });

        modalInstance.result.then(function(response){
            $scope.response = response.data;
            $scope.load();
        }, function(){
        });
    };

    $scope.deleteApp = function(appId){
        
    };

    $scope.load();

}])

.controller('AppDeveloperCreateCtrl', ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance){

    $scope.app = {
        name: '',
        url: '',
        scopes: []
    };
    $scope.scopes = [];

    $http.get(fusio_url + 'consumer/scope').then(function(response){
        $scope.scopes = response.data.entry;
    });
    
    $scope.create = function(apps){
        
    };

    $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
    };

}])

.controller('AppDeveloperDetailCtrl', ['$scope', '$http', '$uibModalInstance', 'app', function($scope, $http, $uibModalInstance, app){

    $scope.app = app;

    $http.get(fusio_url + 'consumer/app/developer/' + app.id).then(function(response){
        $scope.app = response.data;
    });
    
    $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
    };

}]);


