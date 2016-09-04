'use strict';

angular.module('fusioApp.account.app.developer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/app/developer', {
    templateUrl: 'app/account/app/developer/developer.html',
    controller: 'AccountAppDeveloperCtrl'
  });
}])

.controller('AccountAppDeveloperCtrl', ['$scope', '$http', '$uibModal', '$auth', '$location', 'fusio', function($scope, $http, $uibModal, $auth, $location, fusio) {

  $scope.apps = [];

  if (!$auth.isAuthenticated()) {
    $location.path('/login');
    return;
  }

  $scope.load = function() {
    $http.get(fusio.baseUrl + 'consumer/app/developer').then(function(response) {
      $scope.apps = response.data.entry;
    });
  };

  $scope.createApp = function() {
    var modalInstance = $uibModal.open({
      size: 'md',
      backdrop: 'static',
      templateUrl: 'app/account/app/developer/create.html',
      controller: 'AccountAppDeveloperCreateCtrl'
    });

    modalInstance.result.then(function(response) {
      $scope.load();
    }, function() {
    });
  };

  $scope.showApp = function(app) {
    var modalInstance = $uibModal.open({
      size: 'md',
      backdrop: 'static',
      templateUrl: 'app/account/app/developer/detail.html',
      controller: 'AccountAppDeveloperDetailCtrl',
      resolve: {
        app: function() {
          return app;
        }
      }
    });
  };

  $scope.deleteApp = function(app) {
    if (confirm('Do you really want to delete the app?')) {
      $http.delete(fusio.baseUrl + 'consumer/app/developer/' + app.id).then(function(response) {
        $scope.load();
      });
    }
  };

  $scope.load();

}])

.controller('AccountAppDeveloperCreateCtrl', ['$scope', '$http', '$uibModalInstance', 'fusio', function($scope, $http, $uibModalInstance, fusio) {

  $scope.app = {
    name: '',
    url: '',
    scopes: []
  };
  $scope.scopes = [];

  $http.get(fusio.baseUrl + 'consumer/scope').then(function(response) {
    $scope.scopes = response.data.entry;
  });

  $scope.create = function(app) {
    var data = angular.copy(app);

    // filter scopes
    if (data.scopes && angular.isArray(data.scopes)) {
      data.scopes = data.scopes.filter(function(value) {
        return value !== null && value !== undefined;
      });
    }

    $http.post(fusio.baseUrl + 'consumer/app/developer', data).then(function(response) {
      $scope.response = response.data;
      if (response.data.success === true) {
        $uibModalInstance.close();
      }
    }, function(response) {
      $scope.response = response.data;
    });
  };

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

}])

.controller('AccountAppDeveloperDetailCtrl', ['$scope', '$http', '$uibModalInstance', 'app', 'fusio', function($scope, $http, $uibModalInstance, app, fusio) {

  $scope.app = app;

  $http.get(fusio.baseUrl + 'consumer/app/developer/' + app.id).then(function(response) {
    $scope.app = response.data;
  });

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };

}]);


