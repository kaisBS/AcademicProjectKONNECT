(function(angular) {
    'use strict';

    function UserFN($resource) {
        var url = "../api/accidents";
        var params = {
            types: "@types"
        };
        var customMethods = {
            'update': {
                method: "PUT",
				url : "../api/accidents"
            }
        };
        var Product = $resource(url, params, customMethods);
        return Product;
    }
    UserFN.$inject = ["$resource"];
    angular.module("meanstackadmin").factory("Accident", UserFN);
})(angular);
