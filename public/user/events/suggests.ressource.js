(function(angular) {
    'use strict';

    function UserFN($resource) {
        var url = "../api/suggests";
        var params = {
            types: "@types"
        };
        var customMethods = {
            'update': {
                method: "PUT",
				url : "../api/suggests"
            }
        };
        var Product = $resource(url, params, customMethods);
        return Product;
    }
    UserFN.$inject = ["$resource"];
    angular.module("meanstack").factory("Suggest", UserFN);
})(angular);
