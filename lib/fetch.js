/*
 * This class is the primary means of interacting with the ZipCollection.
 * */

var ZipCollection = require('./zipCollection');
var core = require('projevo-core');
var log = core.Logger.logger();


/*
 * This method fetches all records matching a given city.
 *
 * @param city The city to be fetched.
 *
 * @return A promise containing all records matching the given city
 * */
var getZipByCity = function (city) {
    return ZipCollection().findByCity(city)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        });
};

/*
 * This method fetches all records.
 *
 * @return A promise containing all records
 * */
var findAll = function () {
    return ZipCollection().findAll()
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        });
};

/*
 * This method adds a new record to the collection.
 *
 * @param record The record to be added.
 *
 * @return A promise containing the result from the database.
 * */
var addRecord = function (record) {
    return ZipCollection().addRecord(record)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        })
};

/*
 * This method updates a record in the collection.
 *
 * @param record The record to be updated.
 *
 * @return A promise containing the result from the database.
 * */
var updateRecord = function (record) {
    return ZipCollection().getRecordById(record._id)
        .then(function (newRecord) {

            //If a field is blank, use the one already in the database.
            newRecord.loc = record.loc || newRecord.loc;
            newRecord.city = record.city || newRecord.city;
            newRecord.state = record.state || newRecord.state;
            newRecord.pop = record.pop || newRecord.pop;

            return ZipCollection().updateRecord(newRecord)
                .then(function (result) {
                    return result;
                }, function (err) {
                    log.error(err);
                })
        }, function (err) {
            log.error(err);
        });
};

/*
 * This method fetches a record based on the given ID.
 *
 * @param recordID The record to be added.
 *
 * @return A promise containing the result from the database.
 * */
var getRecordByID = function (recordID) {
    return ZipCollection().getRecordById(recordID)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        })
};

/*
 * This method was to be used to delete a record from the database, until I realized it was not part of the spec
 *
 * @param The record to be deleted.
 *
 * @return A promise containing the result from the database.
 * */

/* var removeRecord = function (record) {
    return ZipCollection().deleteRecord(record)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        });
};
*/
module.exports = {
    getZipByCity: getZipByCity,
    findAll: findAll,
    addRecord: addRecord,
    updateRecord: updateRecord,
    getRecordByID: getRecordByID,
    removeRecord: removeRecord
};