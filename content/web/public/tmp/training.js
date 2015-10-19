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
        })
        .when('/delete/:id', {
            templateUrl: 'delete',
            controller: 'DeleteCtrl'
        });
    $locationProvider.html5Mode(true);
}]);

app.run(["zipService", "events", function (zipService, events) {
    events.dispatch(events.types.VIEW_LOADING);
    zipService.fetchSeed();
}]);

'use strict';

evo.module('peControllers')
    .controller('LoadingGlobalController', ['$scope', 'events', 'evoBrowser', function ($scope, events, evoBrowser) {
        $scope.supportsCss3Animation = evoBrowser.supportsCSS3Animation();
        function isVisible(boo) {
            $scope.isLoading = boo;
        }

        $scope.bars = function (n) {
            var ret = [];
            for (var i = 0; i < n; ++i)
                ret.push(i);

            return ret;
        };

        $scope.$on(events.types.VIEW_LOADED, function () {
            isVisible(false);
        });

        $scope.$on(events.types.VIEW_LOADING, function () {
            isVisible(true);
        });
        $scope.$on('$routeChangeStart', function () {
            isVisible(true);
        });
    }]);
'use strict';

/* Controllers */
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
evo.module('evo.common.directives')
    .directive('loadingGlobal',[
        '$log',
        '$rootScope',
        'orderByFilter',
        'filterFilter',
        function($log,$rootScope,orderByFilter,filterFilter) {
            return {
                restrict: 'EA',
                templateUrl: 'loadingModalGlobal',
                controller: 'LoadingGlobalController'
            };
        }]);
'use strict';

evo.module('evo.evoTraining.services')
    .factory('events', ['$rootScope', function ($rootScope) {
        var types = {
            VIEW_LOADING: 'viewLoading',
            VIEW_LOADED: 'viewLoaded',
            TICKETS_REFRESHED: 'ticketsRefreshed',
            ORDERS_REFRESHED: 'ordersRefreshed',
            API_TIMEOUT_ERROR: 'apiTimeout'
        };
        function dispatch(event, args) {
            if (!event || typeof arguments[0] !== "string")
                throw new Error("Event type string must be first argument; all other optional args can follow.");
            if (event == types.VIEW_LOADING || event == types.VIEW_LOADED)
                $rootScope.$broadcast(event, args);
            else
                $rootScope.$emit(event, args);
        }
        return {
            types: types,
            dispatch: dispatch
        };
    }]);
"use strict";

evo.module("evo.evoTraining.services", []).service("zipService", [
    "evoAPI",
    "$rootScope",
    "$log",
    "events",
    function (evoAPI, $rootScope, $log, events) {
        var self = this;
        self.data = {};

        self.fetchSeed = function () {
            evoAPI.callFunction('findAll').then(function (data) {
                self.data = data.result;
                $rootScope.$broadcast("dataFetched");
            }, function (err) {
                $log.error(err);
            })
        };

        self.fetchSmallSeed = function () {
            return evoAPI.callFunction('getZipByCity', 'BARRE').then(function (data) {
                self.data = data.result;
                $rootScope.$broadcast("dataFetched");
                return self.data;
            }, function (err) {
                $log.error(err);
            })
        };

        self.fetchRecord = function (recordID) {
            return evoAPI.callFunction('getRecordByID', recordID).then(function (data) {
                return data.result;
            }, function (err) {
                $log.error(err);
            })
        };

        self.removeRecord = function (record) {
            return evoAPI.callFunction('removeRecord', record).then(function (data) {
                self.fetchSeed();
                return data.result;
            }, function (err) {
                $log.error(err);
            })
        };

        self.updateRecord = function (newRecord) {
            return evoAPI.callFunction('updateRecord', newRecord).then(function () {
                self.fetchSeed();
            }, function (err) {
                $log.error(err);
            })
        };

        $rootScope.$on('addRecord', function (event, message) {
            events.dispatch(events.types.VIEW_LOADING);
            console.log('zipService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('addRecord', message.data)
                .then(function () {
                    self.fetchSeed();
                }, function (err) {
                    $log.error(err);
                    events.dispatch(events.types.VIEW_LOADED);
                });
        });

        $rootScope.$on('updateRecord', function (event, message) {
            events.dispatch(events.types.VIEW_LOADING);
            console.log('zipService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('updateRecord', message.data)
                .then(function () {
                    self.fetchSeed();
                }, function (err) {
                    $log.error(err);
                    events.dispatch(events.types.VIEW_LOADED);
                });
        })
    }
]);