'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', function($rootScope, $scope, $log, evoAPI) {
        var obj = {city: 'BARRE'};
        evoAPI.callFunction('getZipByCity', obj)
            .then(function(output){
            console.log(output);
        }, function(err)
            {
                console.log(err);
            });
		$log.log('Loading web main controller');
		$scope.message = 'Hello world';
	}]);



