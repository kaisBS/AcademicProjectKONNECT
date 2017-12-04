var app = angular.module("meanstack");
app.directive("headerdirective", function() {
    return {
        restrict:'E',
        templateUrl : "./template/header.html"
    };
});
