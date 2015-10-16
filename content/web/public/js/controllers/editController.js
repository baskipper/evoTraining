'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('EditCtrl', ['$scope', '$log', 'evoAPI', 'zipService', '$routeParams', function ($scope, $log, evoAPI, zipService, $routeParams) {
        $scope.recordID = $routeParams.id;
        zipService.fetchRecord($scope.recordID).then(function(record){
            $scope.record = record;
        });

    }]);