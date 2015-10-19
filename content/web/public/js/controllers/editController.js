'use strict';

/*
* This controller manages the updating of records from the browser
* */
evo.module('peControllers', ['evo'])
    .controller('EditCtrl', ['$scope', '$log', 'zipService', '$routeParams', '$location',
        function ($scope, $log, zipService, $routeParams, $location) {

            //fetch the record based off of the parameter passed through the URL
            $scope.recordID = $routeParams.id;
            zipService.fetchRecord($scope.recordID).then(function (record) {
                $scope.record = record;
            });

            //Redirect to root on cancel button click
            $scope.cancel = function () {
                $location.path('/');
            };

            //Update record and redirect to root on Update button click, show error message if a field is empty
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

            //Check that no fields are empty
            $scope.validUpdate = function () {
                return ($scope.record.city.length > 0 && $scope.record.state.length > 0
                && $scope.record.loc[0].length > 0 && $scope.record.loc[1].length > 0
                && $scope.record.pop.length > 0 );
            }

        }]);