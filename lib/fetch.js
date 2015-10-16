var ZipCollection = require('./zipCollection');
var core = require('projevo-core');
var log = core.Logger.logger();

var getZipByCity = function (obj) {
    return ZipCollection().findByCity(obj)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        });
};

var findAll = function () {
    return ZipCollection().findAll()
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        });
};

var addRecord = function (record) {
    return ZipCollection().addRecord(record)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        })
};

var updateRecord = function (record) {
    return ZipCollection().getRecordById(record._id)
        .then(function (newRecord) {

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

var getRecordByID = function (recordID) {
    return ZipCollection().getRecordById(recordID)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        })
};

var removeRecord = function (record) {
    return ZipCollection().deleteRecord(record)
        .then(function (result) {
            return result;
        }, function (err) {
            log.error(err);
        });
};

module.exports = {
    getZipByCity: getZipByCity,
    findAll: findAll,
    addRecord: addRecord,
    updateRecord: updateRecord,
    getRecordByID: getRecordByID,
    removeRecord: removeRecord
};