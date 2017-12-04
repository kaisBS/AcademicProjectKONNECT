(function (angular) {
    'use strict'

    function controllerFn($scope, UtilsService, User, Accident) {


        $scope.accidents = new Array();
        $scope.$watch('$viewContentLoaded', function () {
            Accident.query().$promise.then(function (data) {
                for(var i = 0 ; i< data.length ; i ++ )
                {
                    var st = new Object();
                    var latlng = new google.maps.LatLng(data[i].x, data[i].y);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        draggable: true,
                        map: map
                    });

                    $scope.accidents.push(marker);
                }
            });

            ///Get Logged In User
            $scope.user = JSON.parse(sessionStorage.user);
            ///Map Init
            if ($scope.user.car.last_path.length > 0) {
                var latlng = new google.maps.LatLng($scope.user.car.last_path[0].x, $scope.user.car.last_path[0].y);
            } else {

                var latlng = new google.maps.LatLng(36.896770, 10.185634);
            }
            var map = {
                zoom: 17,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"), map);

            /// Map Event Listener
            function placeMarker(location) {

                    var marker = new google.maps.Marker({
                        position: location,
                        draggable: true,
                        map: map
                    });

                    $scope.accidents.push(marker);


            }

            google.maps.event.addListener(map, 'click', function (event) {
                placeMarker(event.latLng);
            });

        });

        $scope.save = function(){


            Accident.remove().$promise.then(function(){
                for(var i = 0 ; i< $scope.accidents.length ; i ++ ){
                    var st = new Object();
                    st.x = $scope.accidents[i].position.lat();
                    st.y = $scope.accidents[i].position.lng();

                    var s = new Accident(st);
                    s.$save();
                }
            });

        }

    }

    controllerFn.$inject = ['$scope', 'UtilsService', 'User','Accident'];
    angular.module('meanstack').controller("AccidentController", controllerFn);
})(angular);