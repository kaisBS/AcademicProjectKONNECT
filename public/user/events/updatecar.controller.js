(function (angular) {
    'use strict';

    function ControllerFn($scope, User, uiGmapGoogleMapApi) {

        $scope.user = JSON.parse(sessionStorage.user);
        $scope.update = function () {
            var persist = new User($scope.user);
            persist.$update().then(function (data) {
                sessionStorage.user = JSON.stringify(data);
            });
        }
    }

    ControllerFn.$inject = ['$scope', 'User', 'uiGmapGoogleMapApi'];
    angular.module("meanstack").controller("updatecarController", ControllerFn);
})(angular);