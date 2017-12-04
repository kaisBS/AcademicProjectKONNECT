(function (angular) {
    'use strict';

    function ControllerFn($scope, User, $location) {
        $scope.user = {};
        $scope.user.car = {};
        $scope.user.car.last_path =[{"x": 36.89813840712984,
            "y": 10.179297029972076}];
        $scope.user.car.mistakes =[];
        $scope.user.scores =[1];
        $scope.user.car.last_diagnostics = {
            "rpm": 0,
                "egr_system": false,
                "oxygen_sensor_heater": false,
                "oxygen_sensor": false,
                "acRefgigerant": false,
                "evap_system": false,
                "catalyst": false,
                "components": false,
                "misfire": false,
                "engine_temperature": 0,
                "battery": 0,
                "fuel_rate": 0
        };

        $scope.register = function () {
            var user = new User($scope.user);
            user.$register().then(function(data){
                if(data.status){

                $location.path('/login');
                }
                else {
                    $scope.user = {};
                }
            })
        }


    }

    ControllerFn.$inject = ['$scope', 'User', '$location'];
    angular.module("meanstack").controller("registerController", ControllerFn);
})(angular);