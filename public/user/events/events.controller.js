(function (angular) {
    'use strict';

    function ControllerFn($scope, User,Accident, uiGmapGoogleMapApi) {

        $scope.latestpath = false;
        $scope.lastaccidents = false;
        $scope.laststopsign = false;
        $scope.lastspeed = false;
        $scope.path = [];
        $scope.stops = [];
        $scope.speeds = [];
        $scope.randomMarkers = [];
        $scope.randomMarkers2 = [];


        var getUser = function () {

            $scope.user = JSON.parse(sessionStorage.user);
            $scope.user.car.last_path.forEach(function (element) {
                $scope.path.push({"latitude": element.x, "longitude": element.y});
            });
            $scope.path.reverse();
            $scope.lati = ($scope.path[0].latitude + $scope.path[$scope.path.length - 1].latitude) / 2;
            $scope.longi = ($scope.path[0].longitude + $scope.path[$scope.path.length - 1].longitude) / 2;

            $scope.user.car.mistakes.forEach(function (element) {
                if (element.types == "stop sign") {
                    $scope.stops.push(element);
                }
                else if (element.types == "speed sign") {
                    $scope.speeds.push(element);
                }

            });

            $scope.map = {center: {latitude: $scope.lati, longitude: $scope.longi}, zoom: 17};
            $scope.options = {scrollwheel: false};


        }

        getUser();

        $scope.accidents = new Array();
        $scope.$watch('$viewContentLoaded', function () {
            Accident.query().$promise.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var st =  {
                        id: i,
                        center: {
                            latitude: data[i].x,
                            longitude: data[i].y
                        },
                        radius: 30,
                        stroke: {
                            color: '#08B21F',
                            weight: 2,
                            opacity: 1
                        },
                        fill: {
                            color: '#08B21F',
                            opacity: 0.5
                        },
                        geodesic: true, // optional: defaults to false
                        draggable: false, // optional: defaults to false
                        clickable: true, // optional: defaults to true
                        editable: false, // optional: defaults to false
                        visible: true, // optional: defaults to true
                        control: {}
                    };


                    $scope.accidents.push(st);
                }
            });
        });
        $scope.reset = function () {

            $scope.latestpath = false;
            $scope.lastaccidents = false;
            $scope.laststopsign = false;
            $scope.lastspeed = false;
            $scope.polylines = [];
            $scope.circles = [];

            $scope.randomMarkers = [];
            $scope.randomMarkers2 = [];
            $('#latestpath').attr('checked', false);
            $('#lastaccidents').attr('checked', false);
            $('#laststopsign').attr('checked', false);
            $('#lastspeed').attr('checked', false);
        }

        //$scope.map = {center: {latitude: 36.89770926821515, longitude: 10.18405795097351}, zoom: 17};
        $scope.options = {scrollwheel: false};


        $scope.searchPath = function () {

            if ($scope.latestpath == false) {
                $scope.latestpath = true;

                $scope.polylines = [];
                uiGmapGoogleMapApi.then(function () {
                    $scope.polylines = [
                        {
                            id: 1,
                            path: $scope.path,
                            stroke: {
                                color: '#6060FB',
                                weight: 3
                            },
                            editable: false,
                            draggable: false,
                            geodesic: true,
                            visible: true,
                            icons: [{
                                icon: {
                                    path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                },
                                offset: '25px',
                                repeat: '50px'
                            }]
                        },

                    ];
                });
            }
            else {
                $scope.latestpath = false;

                $scope.polylines = [];
            }

        }


        $scope.searchAccidents = function () {

            if ($scope.lastaccidents == false) {
                $scope.lastaccidents = true;

                $scope.circles = [];
                uiGmapGoogleMapApi.then(function () {
                    $scope.circles = $scope.accidents;
                });
            }
            else {
                $scope.lastaccidents = false;

                $scope.circles = [];
            }

        }


        $scope.searchStopSigns = function () {

            if ($scope.laststopsign == false) {
                $scope.laststopsign = true;
                $scope.map = {
                    center: {
                        latitude: $scope.stops[$scope.stops.length-1].x,
                        longitude: $scope.stops[$scope.stops.length-1].y
                    },

                };
                $scope.options = {
                    scrollwheel: false
                };
                var createRandomMarker = function (i, bounds, idKey) {


                    if (idKey == null) {
                        idKey = "id";
                    }

                    var latitude = $scope.stops[$scope.stops.length-1].x;
                    var longitude = $scope.stops[$scope.stops.length-1].y;
                    var ret = {
                        latitude: latitude,
                        longitude: longitude,
                        title: 'm' + i,
                        icon: 'images/stop.png'
                    };
                    ret[idKey] = i;
                    return ret;
                };
                var markers = [];
                for (var i = 0; i < 2; i++) {
                    markers.push(createRandomMarker(i, $scope.map.bounds))

                }
                $scope.randomMarkers = markers;


            }
            else {
                $scope.laststopsign = false;

                $scope.randomMarkers = [];
            }

        }

        $scope.searchSpeed = function () {

            if ($scope.lastspeed == false) {
                $scope.lastspeed = true;
                $scope.map = {
                    center: {
                        latitude: $scope.speeds[$scope.speeds.length-1].x,
                        longitude: $scope.speeds[$scope.speeds.length-1].y
                    },

                };
                $scope.options = {
                    scrollwheel: false
                };
                var createRandomMarker2 = function (i, bounds, idKey) {


                    if (idKey == null) {
                        idKey = "id";
                    }

                    var latitude = $scope.speeds[$scope.speeds.length-1].x;
                    var longitude = $scope.speeds[$scope.speeds.length-1].y;
                    var ret = {
                        latitude: latitude,
                        longitude: longitude,
                        title: 'm' + i,
                        icon:'images/speed.jpg'
                    };
                    ret[idKey] = i;
                    return ret;
                };
                var markers2 = [];
                for (var i = 3; i < 4; i++) {
                    markers2.push(createRandomMarker2(i, $scope.map.bounds))

                }
                $scope.randomMarkers2 = markers2;


            }
            else {
                $scope.lastspeed = false;

                $scope.randomMarkers2 = [];
            }

        }


    }

    ControllerFn.$inject = ['$scope', 'User', 'Accident', 'uiGmapGoogleMapApi'];
    angular.module("meanstack").controller("eventsController", ControllerFn);
})(angular);