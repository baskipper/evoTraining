'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', function ($rootScope, $scope, $log, evoAPI) {

        $log.log('Loading web main controller');
        $scope.message = 'Hello world';
        var obj = {city: 'BARRE'};

        //I should create a service and load this only once
        evoAPI.callFunction('findAll', obj)
            .then(function (output) {
                $scope.table.data = output.result;
            }, function (err) {
                $log.error(err);
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
            //maybe add a watch?
            data: {}
        };

    }]);



