(function(angular) {
    'use strict';
    //$routeProvider to configure routes in our application
    function configFN($stateProvider, $httpProvider, jwtOptionsProvider, $urlRouterProvider) {
      //.when to specifie the URL of the page and the template to display at that
      //Specific URL, i dont specifie the controller beceause i specifie the controller
      //inside the view (see /product/product.view.html Line 1)
        jwtOptionsProvider.config({
            tokenGetter: [function() {
                return sessionStorage.token;
            }]
        });
        $httpProvider.interceptors.push('jwtInterceptor');
        var dashboardState = {
            name: 'dashboard',
            templateUrl : 'dashboard.html'
        }
        var adminState = {
            name: 'admin',
            url: '/admin',
            parent: dashboardState,
            templateUrl: './admin/admin.view.html'
        }
        var suggestionState = {
            name: 'suggestion',
            url: '/suggestion',
            parent: dashboardState,
            templateUrl: './admin/suggestion.view.html'
        }
        var statState = {
            name: 'stat',
            url: '/stat',
            parent: dashboardState,
            templateUrl: './admin/stat.view.html'
        }
        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: './admin/login.view.html'
        }
        var mapState = {
            name: 'map',
            url: '/map',
            parent: dashboardState,
            templateUrl: './admin/map.view.html'
        }
        $stateProvider.state(loginState);
        $stateProvider.state(dashboardState);
        $stateProvider.state(adminState);
        $stateProvider.state(suggestionState);
        $stateProvider.state(statState);
        $stateProvider.state(mapState);
        $urlRouterProvider.otherwise('/admin');
     
    }
    configFN.$inject = ['$stateProvider','$httpProvider','jwtOptionsProvider','$urlRouterProvider'];

    angular.module("meanstackadmin", ["ui.router","ngResource","angular-jwt","chart.js"]).config(configFN);
})(angular);
