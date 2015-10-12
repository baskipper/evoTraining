'use strict';
var app = evo.module('peApp', ['evo', 'peControllers', 'ngCookies']).

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider.state('mobileView', {
			url: '/',
			templateUrl: 'hello',
			controller: 'MainController'
		});

		$urlRouterProvider.otherwise('/');
	}])
;