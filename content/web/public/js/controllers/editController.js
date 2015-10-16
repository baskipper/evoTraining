'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('EditCtrl', ['$scope', '$log', 'evoAPI', 'seedService', '$routeParams', function ($scope, $log, evoAPI, seedService, $routeParams) {
        $scope.recordID = $routeParams.id;

    }]);