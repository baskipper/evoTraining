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

        $rootScope.$on('addRecord', function(event, message){
            console.log('seedService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('addRecord', message.data)
                .then(function(){
                    self.fetchSeed();
                }, function(err)
                {
                    console.log(err);
                });
        });

        $rootScope.$on('updateRecord', function(event, message){
            console.log('seedService: Received event with message ' + JSON.stringify(message.data));
            evoAPI.callFunction('updateRecord', message.data)
                .then(function(){
                    self.fetchSeed();
                }, function(err)
                {
                    console.log(err);
                });
        })

    }
]);