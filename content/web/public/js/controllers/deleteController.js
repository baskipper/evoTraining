'use strict';

/*
*
* This was to be used to manage deletion of records, until I realized it was not part of the spec.
*
* */

 /*
 evo.module('peControllers', ['evo'])
    .controller('DeleteCtrl', ['$scope', '$log', 'zipService', '$routeParams', '$location', 'evoAPI',
        function ($scope, $log, zipService, $routeParams, $location, evoAPI) {

            $scope.recordID = $routeParams.id;
            zipService.fetchRecord($scope.recordID).then(function (record) {
                $scope.record = record;
            });

            $scope.cancel = function () {
                $location.path('/');
            };

            $scope.delete = function(){
                evoAPI.callFunction('removeRecord', $scope.record).then(function()
                {
                    $location.path('/');
                });
            };

        }]);
    */