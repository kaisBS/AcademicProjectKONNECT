(function(angular) {
    'use strict';

    function UserFN($resource) {
        var url = "../api/users/:login";
        var params = {
            login: "@login"
        };
        var customMethods = {
            'update': {
                method: "PUT",
				url : "../api/users"
            },
            'login': {
                method: "POST",
                params : {
                    login : "login"
                }
            },
            'register': {
                method: "POST",
                params : {
                    login : "register"
                }
            }
        };
        var Product = $resource(url, params, customMethods);
        return Product;
    }
    UserFN.$inject = ["$resource"];
    angular.module("meanstack").factory("User", UserFN);
})(angular);
