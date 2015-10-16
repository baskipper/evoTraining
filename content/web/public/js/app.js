'use strict';

// Declare app level module which depends on filters, and services
var app = evo.module('peApp', [
    'evo',
    'evo.evoTraining.services',
    'evo.common.directives',
    'peControllers',
    'ngCookies',
    'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'hello',
            controller: 'MainController'
        })
        .when('/edit/:id', {
            templateUrl: 'edit',
            controller: 'EditCtrl'
        })
        .when('/delete/:id', {
            templateUrl: 'delete',
            controller: 'DeleteCtrl'
        });
    $locationProvider.html5Mode(true);
}]);

app.run(["zipService", "events", function (zipService, events) {
    events.dispatch(events.types.VIEW_LOADING);
    zipService.fetchSeed();
}]);
