(function (angular) {
    'use strict';

    function ControllerFn($scope, User, $location) {
        $scope.user = null;
        $scope.connect = function () {
            var user = new User($scope.user);
            user.$login().then(function(data){
                if(data.status){
                sessionStorage.user = JSON.stringify(data.user);
                sessionStorage.token = data.token;
                $location.path('/events');
                }
                else {
                    $scope.user = {};
                }
            })
        }


    }

    ControllerFn.$inject = ['$scope', 'User', '$location'];
    angular.module("meanstack").controller("loginController", ControllerFn);
})(angular);