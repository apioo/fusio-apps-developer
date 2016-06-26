'use strict';

angular.module('fusioApp.signup', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl'
    });
}])

.controller('SignupCtrl', ['$scope', '$http', '$auth', function ($scope, $http, $auth) {

    $scope.user = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        captcha: ''
    };

    $scope.register = function(user){
        var data = angular.copy(user);
        delete data.passwordRepeat;
        
        $http.post(fusio_url + 'consumer/register', data)
            .success(function(data){
                $scope.response = data;
            })
            .error(function(data){
                $scope.user.password = '';
                $scope.user.passwordRepeat = '';
                $scope.response = data;
            });
    };

}]);
