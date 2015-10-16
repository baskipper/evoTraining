'use strict';

// Declare app level module which depends on filters, and services
var app = evo.module('peApp', [
    'evo',
    'evo.evoTraining.services',
    'evo.common.directives',
    'peControllers',
    'ngCookies',
    'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'hello',
            controller: 'MainController'
        })
        .when('/edit/:id', {
            templateUrl: 'edit',
            controller: 'EditCtrl'
        });
    $locationProvider.html5Mode(true);
}]);

app.run(["seedService", function (seedService) {
    seedService.fetchSeed();
}]);

'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('EditCtrl', [function () {
        var foo = 'bar';
    }]);
'use strict';

/* Controllers */
evo.module('peControllers', ['evo'])
    .controller('MainController', ['$rootScope', '$scope', '$log', 'evoAPI', 'seedService', '$location', function ($rootScope, $scope, $log, evoAPI, seedService, loc) {

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
                            loc.path('/edit/12');
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
"use strict";

evo.module("evo.evoTraining.services", []).service("seedService", [
    "evoAPI",
    "$rootScope",
    function (evoAPI, $rootScope) {
        var self = this;
        self.data = {};

        self.fetchSeed = function () {
            evoAPI.callFunction('findAll').then(function (data) {
                self.data = data.result;
            })
        };

        self.fetchSmallSeed = function () {
            return evoAPI.callFunction('getZipByCity', 'BARRE').then(function (data) {
                self.data = data.result;
                console.log(self.data);
                $rootScope.$broadcast("dataFetched");
                return self.data;
            })
        };

        $rootScope.$on('addRecord', function (event, message) {
            console.log('seedService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('addRecord', message.data)
                .then(function () {
                    self.fetchSmallSeed();
                }, function (err) {
                    var foo;
                    console.log(err);
                });
        });

        $rootScope.$on('updateRecord', function (event, message) {
            console.log('seedService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('updateRecord', message.data)
                .then(function () {
                    self.fetchSmallSeed();
                }, function (err) {
                    console.log(err);
                });
        })

    }
]);