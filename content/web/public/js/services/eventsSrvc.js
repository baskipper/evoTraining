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