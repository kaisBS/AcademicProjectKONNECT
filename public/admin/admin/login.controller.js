(function (angular) {
    'use strict';

    function ControllerFn($scope, $state, User) {
        $scope.user = {};
        $scope.login = function () {
            var user = new User($scope.user);
            user.$login().then(function (data) {
                if (data.status) {
                    if (data.user.login == 'admin') {
                        sessionStorage.userAdmin = JSON.stringify(data.user);
                        $state.go('admin');
                    }
                    else
                        $scope.user = {};
                } else {
                    $scope.user = {};
                }
            })
        }

    }

    ControllerFn.$inject = ['$scope', '$state', 'User'];
    angular.module("meanstackadmin").controller("loginController", ControllerFn);
})(angular);