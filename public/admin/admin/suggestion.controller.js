(function (angular) {
    'use strict';

    function ControllerFn($scope,Suggest) {
 $scope.suggests = [];
 $scope.suggest ={};
   function selectAll() {
            Suggest.query().$promise.then(function(data) {
                $scope.suggests = data;
            });
       
        }
	selectAll();
	
	 $scope.save = function() {
	var persist = new Suggest($scope.suggest);
                persist.$save().then(function() {
                    selectAll();
                });

    }
	}
    ControllerFn.$inject = ['$scope','Suggest'];
    angular.module("meanstackadmin").controller("suggestController", ControllerFn);
})(angular);