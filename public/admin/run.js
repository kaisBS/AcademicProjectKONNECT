(function (angular) {
    'use strict';
    //cute is the name of the directive and the HTML you need to write : <cute></cute>
    angular.module('meanstackadmin').run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (!(toState.name == 'login')) {
                if (!sessionStorage.userAdmin) {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    }]);
})(angular);