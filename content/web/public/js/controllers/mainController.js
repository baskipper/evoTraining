'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', 'zipService', '$location', function ($rootScope, $scope, $log, evoAPI, zipService, loc) {

        $log.log('Loading web main controller');
        $scope.message = 'Hello world';



        /*
        //I should create a service and load this only once
        evoAPI.callFunction('getZipByCity', obj)
            .then(function (output) {
                $scope.zipData = output.result;
            }, function (err) {
                $log.error(err);
            });
*/
        /*zipService.fetchSmallSeed().then(function(){
            //$scope.zipData = seedService.data;
        });*/

        $rootScope.$on("dataFetched", function(){
            $scope.table.data = undefined;
            $scope.table.data = zipService.data;
        });

        $scope.table = {
            options: {
                pagination: {
                    itemsPerPage: 10
                },

                columns: {
                    "_id": "string",
                    "city": "string",
                    "pop": "string",
                    "state": "string",
                    "loc": "string",
                    "edit": {
                        type: "button",
                        icon: "fa fa-pencil-square-o",
                        width: "50px",
                        textAlign: "center",
                        onclick: function (e, item, column, index) {
                            var id = $scope.table.data[index]._id;
                            loc.path('/edit/' + id);
                        }
                    },
                    "delete": {
                        type: "button",
                        icon: ["fa", "fa-trash"],
                        width: "60px",
                        textAlign: "center",
                        class: "btn-danger",
                        onclick: function (e, item, column, index) {
                            var id = $scope.table.data[index]._id;
                            loc.path('/delete/' + id);
                        }
                    }
                }
            },
            data: {}
        };

        $scope.table.data = zipService.data;
    }]);