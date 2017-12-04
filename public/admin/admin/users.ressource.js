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
                params:{
                    login:"login"
                }
            }
        };
        var User = $resource(url, params, customMethods);
        return User;
    }
    UserFN.$inject = ["$resource"];
    angular.module("meanstackadmin").factory("User", UserFN);
})(angular);
