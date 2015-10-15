var ZipCollection = require('./ZipCollection');
var Q = require('q');
var core = require('projevo-core');
var log = core.Logger.logger();
var eventBus = core.EventBus;


var readRequest = function (req, context) {
    return Q.fcall(function(){
    console.log(req);
    console.log(context);
    eventBus.publishEvent('', req.body);
    });
};

var addRecord = function (req, context) {
    return Q.fcall(function(){
        console.log(req);
        console.log(context);
        var data = {
            source: 'REST',
            method: 'POST',
            data: req.body
        };
        eventBus.publishEvent('addRecord', data);
    }, function(err){
        log.error('Unable to add record');
        log.error(err);
    });
};

module.exports = {
    readRequest: readRequest,
    addRecord: addRecord
};
