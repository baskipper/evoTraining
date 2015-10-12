'use strict';

var core = require('projevo-core');
var Collection = core.Collection;

module.exports = function(){
    var ZipCollection = Collection('zips', null, null);

    ZipCollection.findByCity = function(city)
    {
        return ZipCollection.find({city: city.toUpperCase()})
    };

    return ZipCollection;
};