(function (angular) {
    'use strict';

    function direvtiveFN() {
        return {
            restrict: 'E',
            templateUrl: './components/tags.view.html'
        }
        //Choose the template you want to display as the directives
    }
    //cute is the name of the directive and the HTML you need to write : <cute></cute>
   angular.module('meanstack').directive('tag', direvtiveFN);

})(angular);
