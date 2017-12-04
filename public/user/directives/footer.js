var app = angular.module("meanstack");
app.directive("footerdirective", function() {
    return {
        restrict:'E',
        templateUrl : "./template/footer.html"
    };
});
