(function (angular) {
    'use strict';

    function ControllerFn($scope, User, Accident) {
        $scope.users = [];
        $scope.stops = [];
        $scope.speeds = [];
        $scope.accidents = 5;

        $scope.$watch('$viewContentLoaded', function () {
            Accident.query().$promise.then(function (data) {

                $scope.accidents = data.length;


                User.query().$promise.then(function (data) {
                    $scope.users = data;
console.log(data);
                    data.forEach(function (element) {
                        element.car.mistakes.forEach(function (element) {
                            if (element.types == "stop sign") {
                                $scope.stops.push(element);
                            }
                            else if (element.types == "speed sign") {
                                $scope.speeds.push(element);
                            }

                        });
                    });

                    $scope.labels = ["Number of Accidents", "Number Missed Stop Signs", "Number of Missed Speed Signs "];
                    $scope.data = [$scope.accidents, $scope.stops.length, $scope.speeds.length];
                });

            });


            $scope.chartOptions = {
                onAnimationComplete: function () {
                    this.showTooltip(this.segments, true);
                }
            }

        });


    }

    ControllerFn.$inject = ['$scope', 'User', 'Accident'];
    angular.module("meanstackadmin").controller("statController", ControllerFn);
})(angular);