'use strict';

angular.module('fusioApp.app.developer', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/app/developer', {
        templateUrl: 'app/app/developer/developer.html',
        controller: 'AppDeveloperCtrl'
    });
}])

.controller('AppDeveloperCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', function ($scope, $http, $uibModal, $auth, $location) {

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
            size: 'md',
            backdrop: 'static',
            templateUrl: 'app/app/developer/create.html',
            controller: 'AppDeveloperCreateCtrl'
        });

        modalInstance.result.then(function(response){
            $scope.load();
        }, function(){
        });
    };

    $scope.showApp = function(app){
        var modalInstance = $uibModal.open({
            size: 'md',
            backdrop: 'static',
            templateUrl: 'app/app/developer/detail.html',
            controller: 'AppDeveloperDetailCtrl',
            resolve: {
                app: function(){
                    return app;
                }
            }
        });
    };

    $scope.deleteApp = function(app){
        if (confirm('Do you really want to delete the app?')) {
            $http.delete(fusio_url + 'consumer/app/developer/' + app.id).then(function(response){
                $scope.load();
            });
        }
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
    
    $scope.create = function(app){
        var data = angular.copy(app);

        // filter scopes
        if (data.scopes && angular.isArray(data.scopes)) {
            data.scopes = data.scopes.filter(function(value){
                return value != null;
            });
        }

        $http.post(fusio_url + 'consumer/app/developer', data).then(function(response){
            $scope.response = response.data;
            if (response.data.success === true) {
                $uibModalInstance.close();
            }
        }, function(response){
            $scope.response = response.data;
        });
    };

    $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
    };

    $scope.closeResponse = function(){
        $scope.response = null;
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


