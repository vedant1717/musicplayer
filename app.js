// app.js
var app = angular.module('loginApp', []);

app.controller('loginController', function($scope, $http) {
    $scope.login = function() {
        var data = {
            username: $scope.username,
            password: $scope.password
        };
        // Replace '/login' with the actual URL for your login API
        $http.post('/login', data).then(function(response) {
            if (response.data.success) {
                // Redirect to 'index.html' upon successful login
                window.location.href = 'index.html';
            } else {
                $scope.error = response.data.message;
            }
        }, function(error) {
            $scope.error = error.data.message;
        });
    };
});
