'use strict';

/*
* This controller manages the primary view, containing the table of all the items in the Zip collection.
* */
evo.module('peControllers', ['evo'])
    .controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', 'zipService', '$location', 'events', function ($rootScope, $scope, $log, evoAPI, zipService, loc, events) {

        $log.log('Loading web main controller');

        //This rebuilds the table whenever an update or addition is made to the collection
        $rootScope.$on("dataFetched", function(){
            $scope.table.data = undefined;
            $scope.table.data = zipService.data;
            events.dispatch(events.types.VIEW_LOADED);
        });

        //Initialize the table columns and data
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
                    }
                }
            },
            data: {}
        };

        //Set the table data to the data fetched by the zipService
        $scope.table.data = zipService.data;
    }]);