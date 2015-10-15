var ZipCollection = require('./zipCollection');

var getZipByCity = function (obj) {
    return ZipCollection().findByCity(obj.city)
        .then(function (result) {
            return result;
        }, function (err) {
            console.log(err);
        });
};

var findAll = function () {
    return ZipCollection().findAll()
        .then(function (result) {
            return result;
        }, function (err) {
            console.log(err);
        });
};

var addRecord = function (record) {
    return ZipCollection().addRecord(record)
        .then(function (result) {
            return result;
        }, function (err) {
            console.log(err);
        })
};

var updateRecord = function (record) {
    return ZipCollection().getRecordById(record._id)
        .then(function (newRecord) {

            console.log(newRecord);
            newRecord.loc = record.loc || newRecord.loc;
            newRecord.city = record.city || newRecord.city;
            newRecord.state = record.state || newRecord.state;
            newRecord.pop = record.pop || newRecord.pop;

            return ZipCollection().updateRecord(newRecord)
                .then(function (result) {
                    return result;
                }, function (err) {
                    console.log(err);
                })

        });
};

module.exports = {
    getZipByCity: getZipByCity,
    findAll: findAll,
    addRecord: addRecord,
    updateRecord: updateRecord
};