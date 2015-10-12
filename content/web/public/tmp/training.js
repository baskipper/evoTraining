'use strict';

// Declare app level module which depends on filters, and services
evo.module('peApp', ['evo', 'peControllers', 'ngCookies', 'ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
		templateUrl: 'hello',
        controller: 'MainController'
      }).otherwise({redirectTo: '/'})
	;
    $locationProvider.html5Mode(true);
}]);

'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
	.controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', function($rootScope, $scope, $log, evoAPI) {
        var obj = {city: 'BARRE'}
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



