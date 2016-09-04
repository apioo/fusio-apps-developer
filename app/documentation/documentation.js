'use strict';

angular.module('fusioApp.documentation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/documentation/:doc?', {
    templateUrl: 'app/documentation/documentation.html',
    controller: 'DocumentationCtrl'
  });
}])

.controller('DocumentationCtrl', ['$scope', '$auth', '$location', '$http', '$routeParams', 'fusio', function($scope, $auth, $location, $http, $routeParams, fusio) {

  $scope.menu = fusio.documentationMenu;
  $scope.content = null;

  $scope.loadDoc = function(href) {
    $http.get('docs/' + href + '.htm').then(function(response) {
      $scope.content = response.data;
    }, function() {
      $scope.content = 'Could not load document';
    });
  };

  $scope.getFirstObjectValue = function(object){
    if (angular.isObject(object)) {
      var key = Object.keys(object)[0];
      return object[key] ? object[key] : null;
    } else {
      return null;
    }
  };

  if ($routeParams.doc) {
    $scope.loadDoc($routeParams.doc);
  } else {
    var group = $scope.getFirstObjectValue($scope.menu);
    var href = $scope.getFirstObjectValue(group);
    $scope.loadDoc(href);
  }

}]);
