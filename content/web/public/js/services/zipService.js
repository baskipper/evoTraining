"use strict";

/*
 *
 * This service contains functions for interacting with the Zip collection from the frontend.
 *
 * */
evo.module("evo.evoTraining.services", []).service("zipService", [
    "evoAPI",
    "$rootScope",
    "$log",
    "events",
    function (evoAPI, $rootScope, $log, events) {
        var self = this;
        self.data = {};

        /*
         * This method fetches the entire collection to seed the app, and stores the data in a global variable.
         * */
        self.fetchSeed = function () {
            evoAPI.callFunction('findAll').then(function (data) {
                self.data = data.result;
                $rootScope.$broadcast("dataFetched");
            }, function (err) {
                $log.error(err);
            })
        };

        /*
         * This method fetches a small portion of the collection, for testing purposes only.
         *
         * @return A promise containing the subset of data.
         * */
        self.fetchSmallSeed = function () {
            return evoAPI.callFunction('getZipByCity', 'BARRE').then(function (data) {
                self.data = data.result;
                $rootScope.$broadcast("dataFetched");
                return self.data;
            }, function (err) {
                $log.error(err);
            })
        };

        /**
         *
         * This method fetches a single record, used to fetch one to update.
         *
         * @param recordID The ID of the record to fetch.
         *
         * @return A promise containing a single record
         */

        self.fetchRecord = function (recordID) {
            return evoAPI.callFunction('getRecordByID', recordID).then(function (data) {
                events.dispatch(events.types.VIEW_LOADED);
                return data.result;
            }, function (err) {
                events.dispatch(events.types.VIEW_LOADED);
                $log.error(err);
            })
        };

        /*
         *
         * This method was to be used to delete a given record, until I realized it was not part of the spec.
         *
         * @param record The record to delete.
         *
         * @return A then-able promise.
         * */

        /*         self.removeRecord = function (record) {
         return evoAPI.callFunction('removeRecord', record).then(function (data) {
         self.fetchSeed();
         return data.result;
         }, function (err) {
         $log.error(err);
         })
         };
         */

        /*
         * This method updates a given record, then re-fetches the zip collection. Used by the browser method.
         *
         * @param newRecord The record to update.
         *
         * @returns A then-able promise
         */
        self.updateRecord = function (newRecord) {
            return evoAPI.callFunction('updateRecord', newRecord).then(function () {
                self.fetchSeed();
            }, function (err) {
                $log.error(err);
            })
        };

        /*
        *
        * This method adds a new record, used by the REST client method.
        * */
        $rootScope.$on('addRecord', function (event, message) {
            events.dispatch(events.types.VIEW_LOADING);
            $log.debug('zipService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('addRecord', message.data)
                .then(function () {
                    self.fetchSeed();
                }, function (err) {
                    $log.error(err);
                    events.dispatch(events.types.VIEW_LOADED);
                });
        });


        /*
         *
         * This method updates a record, used by the REST client method.
         * */
        $rootScope.$on('updateRecord', function (event, message) {
            events.dispatch(events.types.VIEW_LOADING);
            $log.debug('zipService: Received event with message ' + JSON.stringify(message.data));
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