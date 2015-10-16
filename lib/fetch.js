var ZipCollection = require('./zipCollection');

var getZipByCity = function (obj) {
    return ZipCollection().findByCity(obj)
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

var getRecordByID = function(recordID)
{
    console.log('getting record by ID')
    return ZipCollection().getRecordById(recordID)
        .then(function(result){
            console.log('got record by ID');
            return result;
        })
};

var removeRecord = function(record)
{
    console.log('deleting record');
  return ZipCollection().deleteRecord(record)
      .then(function(result){
         return result;
      }, function(err)
      {
          console.log(err);
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