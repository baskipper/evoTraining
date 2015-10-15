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
            console.log('seedService: Received event with message ' + JSON.stringify(message));
        })

    }
]);