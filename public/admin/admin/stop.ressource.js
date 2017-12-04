(function(angular) {
    'use strict';

    function UserFN($resource) {
        var url = "../api/stops";
        var params = {
            types: "@types"
        };
        var customMethods = {
            'update': {
                method: "PUT",
				url : "../api/stops"
            }
        };
        var Product = $resource(url, params, customMethods);
        return Product;
    }
    UserFN.$inject = ["$resource"];
    angular.module("meanstackadmin").factory("Stop", UserFN);
})(angular);
