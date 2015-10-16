'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', 'seedService', function ($rootScope, $scope, $log, evoAPI, seedService) {

        $log.log('Loading web main controller');
        $scope.message = 'Hello world';
        $scope.zipData = undefined;


        /*
        //I should create a service and load this only once
        evoAPI.callFunction('getZipByCity', obj)
            .then(function (output) {
                $scope.zipData = output.result;
            }, function (err) {
                $log.error(err);
            });
*/
        seedService.fetchSmallSeed().then(function(){
            //$scope.zipData = seedService.data;
        });

        $rootScope.$on("dataFetched", function(){
            $scope.table.data = undefined;
            $scope.table.data = seedService.data;
        });


        $scope.$watch("zipData", function () {
            console.log('watch fired')
            $scope.table.data = $scope.zipData;
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
                            console.log("Clicked Edit")
                            console.log(e)
                            console.log($scope.table.data[index])
                            console.log(column)
                            console.log(index)
                        }
                    },
                    "delete": {
                        type: "button",
                        icon: ["fa", "fa-trash"],
                        width: "60px",
                        textAlign: "center",
                        class: "btn-danger",
                        onclick: function (e, item, column, index) {
                            console.log("Clicked Delete")
                        }
                    }
                }
            },
            //maybe add a watch? and an emitter in rest?
            //it looks like rootscope and emitters can both listen to the event bus
            //so, my dummy handler needs to put something on the event bus, I need to declare an
            //emitter in my socketProvider, and I need to listen with rootscope and do something, probably in my seedservice
            data: {}
        };

    }]);



