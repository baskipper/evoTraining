'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', 'zipService', '$location', 'events', function ($rootScope, $scope, $log, evoAPI, zipService, loc, events) {

        $log.log('Loading web main controller');
        $scope.message = 'Hello world';

        $rootScope.$on("dataFetched", function(){
            $scope.table.data = undefined;
            $scope.table.data = zipService.data;
            events.dispatch(events.types.VIEW_LOADED);
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
                    }
                }
            },
            data: {}
        };

        $scope.table.data = zipService.data;
    }]);