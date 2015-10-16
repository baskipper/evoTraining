"use strict";

evo.module("evo.evoTraining.services", []).service("zipService", [
    "evoAPI",
    "$rootScope",
    function (evoAPI, $rootScope) {
        var self = this;
        self.data = {};

        self.fetchSeed = function () {
            evoAPI.callFunction('findAll').then(function (data) {
                self.data = data.result;
                $rootScope.$broadcast("dataFetched");
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

        self.fetchRecord = function(recordID){
            return evoAPI.callFunction('getRecordByID', recordID).then(function(data){
                return data.result;
            }, function (err)
            {
                console.log(err);
            })
        };

        self.removeRecord = function(record)
        {
            return evoAPI.callFunction('removeRecord', record).then(function(data)
            {
                self.fetchSeed();
                return data.result;
            }, function(err)
            {
                console.log(err);
            })
        };

        self.updateRecord = function (newRecord){
            return evoAPI.callFunction('updateRecord', newRecord).then(function(){
                self.fetchSeed();
            }, function (err){
                console.log(err);
            })
        };

        $rootScope.$on('addRecord', function (event, message) {
            console.log('zipService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('addRecord', message.data)
                .then(function () {
                    self.fetchSeed();
                }, function (err) {
                    var foo;
                    console.log(err);
                });
        });

        $rootScope.$on('updateRecord', function (event, message) {
            console.log('zipService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('updateRecord', message.data)
                .then(function () {
                    self.fetchSeed();
                }, function (err) {
                    console.log(err);
                });
        })

    }
]);