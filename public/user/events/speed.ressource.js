(function(angular) {
    'use strict';

    function UserFN($resource) {
        var url = "../api/speeds";
        var params = {
            types: "@types"
        };
        var customMethods = {
            'update': {
                method: "PUT",
				url : "../api/speeds"
            }
        };
        var Product = $resource(url, params, customMethods);
        return Product;
    }
    UserFN.$inject = ["$resource"];
    angular.module("meanstack").factory("Speed", UserFN);
})(angular);
