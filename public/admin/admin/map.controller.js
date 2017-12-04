(function (angular) {
    'use strict'

    function controllerFn($scope, UtilsService, User, Speed, Stop) {
        function deleteMarker(location){
            for(var i = 0 ; i<$scope.stops.length;i++){
                if($scope.stops[i].position.lat() == location.lat() && $scope.stops[i].position.lng() == location.lng() ){
                    $scope.stops.splice(i,1);
                    break;
                }
            }

        }
        $scope.speedvalue=50;
        $scope.sign = 'stop';
        $scope.stops = new Array();
        $scope.speeds = new Array();
        $scope.$watch('$viewContentLoaded', function () {
            Speed.query().$promise.then(function (data) {
                for(var i = 0 ; i< data.length ; i ++ )
                {
                    var st = new Object();
                    var latlng = new google.maps.LatLng(data[i].x, data[i].y);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        draggable: true,
                        icon: './images/speed.jpg',
                        map: map,
                        speed: data.speed
                    });
                    marker.addListener('click', function() {
                        deleteMarker(marker.position);
                    });
                    $scope.speeds.push(marker);
                }
            });
            Stop.query().$promise.then(function (data) {
                for(var i = 0 ; i< data.length ; i ++ )
                {
                    var st = new Object();
                    var latlng = new google.maps.LatLng(data[i].x, data[i].y);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        draggable: true,
                        icon: './images/stop.png',
                        map: map
                    });
                    marker.addListener('click', function() {
                        deleteMarker(marker.position);
                    });
                    $scope.stops.push(marker);
                }
            });
            ///Get Logged In User
            $scope.user = JSON.parse(sessionStorage.userAdmin);
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
                if($scope.sign == "stop") {
                    var marker = new google.maps.Marker({
                        position: location,
                        draggable: true,
                        icon: './images/stop.png',
                        map: map
                    });
                    marker.addListener('click', function () {
                        deleteMarker(marker.position);
                    });
                    $scope.stops.push(marker);
                } else if($scope.sign == "speed") {
                    var marker = new google.maps.Marker({
                        position: location,
                        draggable: true,
                        icon: './images/speed.jpg',
                        map: map
                    });
                    marker.addListener('click', function () {
                        deleteMarker(marker.position);
                    });
                    marker.speed = $scope.speedvalue;
                    $scope.speeds.push(marker);
                }

            }

            google.maps.event.addListener(map, 'click', function (event) {
                placeMarker(event.latLng);
            });

        });

        $scope.save = function(){

            Stop.remove().$promise.then(function(){
                for(var i = 0 ; i< $scope.stops.length ; i ++ ){
                    var st = new Object();
                    st.x = $scope.stops[i].position.lat();
                    st.y = $scope.stops[i].position.lng();
                    var s = new Stop(st);
                    s.$save();
                }
            });
            Speed.remove().$promise.then(function(){
                for(var i = 0 ; i< $scope.speeds.length ; i ++ ){
                    var st = new Object();
                    st.x = $scope.speeds[i].position.lat();
                    st.y = $scope.speeds[i].position.lng();
                    st.speed = $scope.speeds[i].speed;
                    var s = new Speed(st);
                    s.$save();
                }
            });

        }

    }

    controllerFn.$inject = ['$scope', 'UtilsService', 'User','Speed', 'Stop'];
    angular.module('meanstackadmin').controller("MapController", controllerFn);
})(angular);