"use strict";

evo.module("evo.evoTraining.services", []).service("seedService", [
    "evoAPI",
    function(evoAPI){
        var self = this;
        self.data = {};

        self.fetchSeed = function(){evoAPI.callFunction('findAll').then(function(data)
        {
            self.data = data.result;
        })
    }}
]);