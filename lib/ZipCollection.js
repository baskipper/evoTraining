'use strict';

var core = require('projevo-core');
var Collection = core.Collection;
var log = core.Logger.logger();

module.exports = function () {
    var ZipCollection = Collection('zips', null, null);

    ZipCollection.findByCity = function (city) {
        return ZipCollection.find({city: city.toUpperCase()})
    };

    //Any records added will have ObjectIDs instead of _ids. This checks for both
    ZipCollection.getRecordById = function (recordID) {
        return ZipCollection.get({_id: recordID}).then(function (output) {
            if (output) {
                console.log(output);
                return output;
            }
            else {
                console.log('return else');
                return ZipCollection.getById(recordID);
            }
        }, function (err) {
            log.error(err);
        })
    };

    ZipCollection.deleteRecord = function (record) {
        return ZipCollection.remove(record);
    };


    ZipCollection.findAll = function () {
        return ZipCollection.find();
    };

    ZipCollection.addRecord = function (record) {
        return ZipCollection.save(record);
    };

    ZipCollection.updateRecord = function (record) {
        return ZipCollection.update({_id: record._id}, record)
    };

    return ZipCollection;
};