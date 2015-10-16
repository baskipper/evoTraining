'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('EditCtrl', ['$scope', '$log', 'zipService', '$routeParams', '$location',
        function ($scope, $log, zipService, $routeParams, $location) {

            $scope.recordID = $routeParams.id;
            zipService.fetchRecord($scope.recordID).then(function (record) {
                $scope.record = record;
            });

            $scope.cancel = function () {
                $location.path('/');
            };

            $scope.update = function () {
                if ($scope.validUpdate()) {
                    zipService.updateRecord($scope.record);
                    $location.path('/');
                }
                else
                {
                    $scope.showError = true;
                }
            };

            $scope.validUpdate = function () {
                return ($scope.record.city.length > 0 && $scope.record.state.length > 0
                && $scope.record.loc[0].length > 0 && $scope.record.loc[1].length > 0
                && $scope.record.pop.length > 0 );
            }

        }]);