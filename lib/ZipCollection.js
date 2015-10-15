'use strict';

var core = require('projevo-core');
var Collection = core.Collection;

module.exports = function(){
    var ZipCollection = Collection('zips', null, null);

    ZipCollection.findByCity = function(city)
    {
        return ZipCollection.find({city: city.toUpperCase()})
    };

    ZipCollection.findAll = function()
    {
        return ZipCollection.find();
    };

    ZipCollection.addRecord = function(record)
    {
        return ZipCollection.save(record);
    };

    ZipCollection.updateRecord = function(record)
    {
        return ZipCollection.update({_id: record._id}, record)
    }

    return ZipCollection;
};