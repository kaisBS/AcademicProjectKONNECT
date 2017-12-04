(function(angular) {
    'use strict';
    function filtreFn() {
        return function(input) {
            var string = ""+input;
            return string;
        }
    }
    angular
        .module('meanstack')
        .filter('customfilter', filtreFn);
})(angular);