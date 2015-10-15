var ZipCollection = require('./zipCollection');

var getZipByCity = function(obj){
    return ZipCollection().findByCity(obj.city)
        .then(function(result){
              return result;
    }, function(err){
            console.log(err);
        });
};

var findAll = function(){
    return ZipCollection().findAll()
        .then(function(result){
            return result;
        }, function(err){
            console.log(err);
        });
};

var addRecord = function(record)
{
    return ZipCollection().addRecord(record)
        .then(function(result){
            return result;
        }, function (err)
        {
            console.log(err);
        })
};

var updateRecord = function(record)
{
    return ZipCollection().updateRecord(record)
        .then(function(result){
            return result;
        }, function (err)
        {
            console.log(err);
        })
}

module.exports = {
  getZipByCity: getZipByCity,
    findAll: findAll,
    addRecord: addRecord,
    updateRecord: updateRecord
};