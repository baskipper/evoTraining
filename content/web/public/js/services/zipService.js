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