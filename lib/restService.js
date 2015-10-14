var ZipCollection = require('./ZipCollection');
var Q = require('q');

var readRequest = function (req, context) {
    console.log(req);
    console.log(context);
    return Q.fcall(function(){
    console.log(req);
    console.log(context);
    });
};

module.exports = {
    readRequest: readRequest
};
