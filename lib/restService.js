var Q = require('q');
var core = require('projevo-core');
var log = core.Logger.logger();
var eventBus = core.EventBus;


var addRecord = function (req, context) {
    return Q.fcall(function(){
        if (!verifyAddRecord(req.body))
        {
            throw Error('Record must contain City, pop, state, and location');
        }
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

var updateRecord = function(req, context)
{
    if (!verifyUpdateRecord(req.body))
    {
        throw Error('Record must contain _id, and one or more of the following: City, pop, state, and location');
    }
    return Q.fcall(function()
    {
        var data = {
            source: 'REST',
            method: 'POST',
            data: req.body
        };
        eventBus.publishEvent('updateRecord', data);
    }, function(err){
        log.error('Unable to add record');
        log.error(err);
    });
};

var verifyUpdateRecord = function(record){
    return (record._id && (record.city || record.pop || record.state || (record.loc && record.loc.length == 2)));
};

var verifyAddRecord = function(record)
{
    return (record.city && record.pop && record.state && record.loc && record.loc.length == 2)
};

module.exports = {
    addRecord: addRecord,
    updateRecord: updateRecord
};
