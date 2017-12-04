(function (angular) {
    'use strict';

    function ControllerFn($scope, User) {
        var user = new User();
        user.login = "admin";
        user.password = "admin";
        user.$login().then(function(data){
            sessionStorage.token = data.token;
            selectAll();
        });
        $scope.users = [];
        function selectAll() {
            User.query().$promise.then(function (data) {
                $scope.users = data;
                for (var i = 0; i < $scope.users.length; i++) {
                    var score = 0;
                    for (var j = 0; j < $scope.users[i].scores.length; j++) {
                        score = score + $scope.users[i].scores[j];
                    }
                    $scope.users[i].scorex= (score/$scope.users[i].scores.length).toFixed(6);
                }
            });
        }

    }

    ControllerFn.$inject = ['$scope', 'User'];
    angular.module("meanstackadmin").controller("adminController", ControllerFn);
})(angular);