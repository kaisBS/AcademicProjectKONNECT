(function (angular) {
    'use strict'

    function controllerFn($scope, UtilsService, User, Speed, Stop) {
        $scope.speed;
        $scope.speeds = new Array();
        $scope.stops = new Array();
        $scope.miss = 0;
        $scope.passed = 0;
        $scope.$watch('$viewContentLoaded', function () {
            // Get Signs
            Speed.query().$promise.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var st = new Object();
                    var latlng = new google.maps.LatLng(data[i].x, data[i].y);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        draggable: false,
                        icon: './images/speed.jpg',
                        map: map
                    });
                    marker.addListener('click', function () {
                        deleteMarker(marker.position);
                    });
                    marker.speed = data[i].speed
                    $scope.speeds.push(marker);
                }
            });
            Stop.query().$promise.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var st = new Object();
                    var latlng = new google.maps.LatLng(data[i].x, data[i].y);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        draggable: false,
                        map: map,
                        icon: './images/stop.png',
                    });
                    marker.addListener('click', function () {
                        deleteMarker(marker.position);
                    });
                    $scope.stops.push(marker);
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


            $scope.user.car.last_path = new Array();
            console.log($scope.user.car.last_path);
            /// Map Event Listener
            function placeMarker(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    draggable: false,
                    map: map
                });
                $scope.user.car.last_path.push({x: location.lat(), y: location.lng()});
                return marker;
            }
			function placeMarkerCar(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    draggable: false,
					icon: './images/car-icons.png',
                    map: map
                });
                $scope.user.car.last_path.push({x: location.lat(), y: location.lng()});
                return marker;
            }

            google.maps.event.addListener(map, 'click', function (event) {
                placeMarker(event.latLng);
            });

            $scope.reset = function () {
                $scope.user = JSON.parse(sessionStorage.user);
                $scope.user.car.last_path = new Array();
            }
            $scope.start = function () {
                $scope.user.car.mistakes = new Array();
                if (($scope.user.car.last_path.length >= 2) && ($scope.speed > 0) && ($scope.speed <= 200)) {
                    var stops = new Array();
                    Object.assign(stops, $scope.stops);
                    var speeds = new Array();
                    Object.assign(speeds, $scope.speeds);
                    var speed = 25 - (Math.floor($scope.speed / 10));
                    var counter = 0;
                    var idx = 0;
                    var car = placeMarkerCar(new google.maps.LatLng($scope.user.car.last_path[0].x, $scope.user.car.last_path[0].y));
                    var interval = setInterval(function () {
                        var x = ((($scope.user.car.last_path[idx + 1].x - $scope.user.car.last_path[idx].x) * counter) / speed) + $scope.user.car.last_path[idx].x;
                        var y = ((($scope.user.car.last_path[idx + 1].y - $scope.user.car.last_path[idx].y) * counter) / speed) + $scope.user.car.last_path[idx].y;
                        car.setPosition(new google.maps.LatLng(x, y));
                        map.panTo(new google.maps.LatLng(x, y));
                        counter++;
                        for (var i = 0; i < stops.length; i++) {
                            if (UtilsService.distance(car.position.lat(), car.position.lng(), stops[i].position.lat(), stops[i].position.lng()) < 0.05) {
                                stops.splice(i, 1);
                                $scope.passed = $scope.passed+1;
                                var x = confirm('stop?');
                                if (x == true) {
                                    $scope.miss = $scope.miss+1;
                                }
                                else {

                                    $scope.user.car.mistakes.push({

                                        "x": car.position.lat(),
                                        "y": car.position.lng(),
                                        "types": "stop sign",
                                        "content": "Stop sign missed",
                                        "dates": new Date()
                                    });
                                }
                            }
                        }

                        for (var i = 0; i < speeds.length; i++) {
                            if (UtilsService.distance(car.position.lat(), car.position.lng(), speeds[i].position.lat(), speeds[i].position.lng()) < 0.05) {
                                alert("Speed limit "+speeds[i].speed)
                                $scope.passed = $scope.passed+1;
                                if (speeds[i].speed < $scope.speed) {


                                    $scope.user.car.mistakes.push({
                                        "x": car.position.lat(),
                                        "y": car.position.lng(),
                                        "types": "speed sign",
                                        "content": "Speed sign missed",
                                        "dates": new Date()
                                    });
                                    speeds.splice(i, 1);

                                }
                                else { $scope.miss = $scope.miss+1;}
                            }
                        }

                        if (counter == speed) {
                            idx++;
                            counter = 0;
                            if (idx == $scope.user.car.last_path.length - 2) {
                                clearInterval(interval);
                                car = null;
                                $scope.user.car.last_path.pop();
								if($scope.passed==0)
									$scope.user.scores.push (1);
								else
                                $scope.user.scores.push ($scope.miss/$scope.passed);
								
								
								
								for (var i = 0; i < $scope.user.scores.length; i++) {
										if($scope.user.scores[i]<0)
											$scope.user.scores[i]=0;
                                }
                                var persist = new User($scope.user);
                                persist.$update().then(function (data) {
                                    sessionStorage.user = JSON.stringify(data);
                                });
                            }
                        }
                    }, 33);
                }
            }

        });

    }

    controllerFn.$inject = ['$scope', 'UtilsService', 'User', 'Speed', 'Stop'];
    angular.module('meanstack').controller("MapController", controllerFn);
})(angular);