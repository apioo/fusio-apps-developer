'use strict';

angular.module('fusioApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'app/signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope', '$http', '$auth', 'fusio', function($scope, $http, $auth, fusio) {

  $scope.user = {
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    captcha: ''
  };

  $scope.register = function(user) {
    var data = angular.copy(user);
    delete data.passwordRepeat;

    $http.post(fusio.baseUrl + 'consumer/register', data)
      .then(function(response) {
        $scope.response = response.data;
      }, function(response) {
        $scope.user.password = '';
        $scope.user.passwordRepeat = '';
        $scope.response = response.data;
      });
  };

  $scope.closeResponse = function() {
    $scope.response = null;
  };

}]);
