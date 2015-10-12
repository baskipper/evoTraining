var ZipCollection = require('./zipCollection');

var getZipByCity = function(obj){
    console.log('called');
    return ZipCollection().findByCity(obj.city)
        .then(function(result){
              return result;
    }, function(err){
            console.log(err);
        });
};

module.exports = {
  getZipByCity: getZipByCity
};