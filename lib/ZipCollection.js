'use strict';
/*
* This class represents a collection containing Zip codes.
*
* @extends Collection
* */
var core = require('projevo-core');
var Collection = core.Collection;
var log = core.Logger.logger();

module.exports = function () {
    var ZipCollection = Collection('zips', null, null);

    /*
    * Fetch zips given a city
    *
    * @param city
    *
    * @return All records containing given city
    * */
    ZipCollection.findByCity = function (city) {
        return ZipCollection.find({city: city.toUpperCase()})
    };

    /*
    * Fetch a single zip given an ID
    *
    * @param recordID
    *
    * @return A single zip matching the ID
    * */
    ZipCollection.getRecordById = function (recordID) {
        //Any records added will have ObjectIDs instead of _ids. This checks for both
        return ZipCollection.get({_id: recordID}).then(function (output) {
            if (output) {
                return output;
            }
            else {
                return ZipCollection.getById(recordID);
            }
        }, function (err) {
            log.error(err);
        })
    };

    /*
    * This method was to fetch a record for deletion, until I realized it was not part of the spec. Moreover, all the
    * Collection methods seem to work on ObjectID, while the zips use the zip code as the ID
    *
    * @param record The record to be deleted.
    *
    * @return The result from the database
    * */

/*     ZipCollection.deleteRecord = function (record) {
        return ZipCollection.remove(record);
    };*/

    /*
    *
    * This method fetches all records from the database.
    *
    * @return All records
    * */
    ZipCollection.findAll = function () {
        return ZipCollection.find();
    };

    /*
    * This method adds a single record to the database.
    *
    * @param record The record to be added
    *
    * @return The result from the database.
    * */
    ZipCollection.addRecord = function (record) {
        return ZipCollection.save(record);
    };

    /*
    * This method updates a single record in the database
    *
    * @param record The record to be updated
    *
    * @return The result from the database.
    * */
    ZipCollection.updateRecord = function (record) {
        return ZipCollection.update({_id: record._id}, record)
    };

    return ZipCollection;
};