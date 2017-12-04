
(function (angular) {
    'use strict';
    angular.module('meanstack').run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event, next, prev) {
            if (!((next.$$route.originalPath == '/login') ||(next.$$route.originalPath == '/register'))) {
                if (!sessionStorage.user) {
                    event.preventDefault();
                    $location.path('/login');
                }
            }
        });
    }]);
})(angular);
