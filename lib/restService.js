/*
*
* This service handles incoming requests from a REST client for updates and additions.
* */


var Q = require('q');
var core = require('projevo-core');
var log = core.Logger.logger();
var eventBus = core.EventBus;


/*
* This handles adding a record by publishing an addRecord event.
* */
var addRecord = function (req, context) {
    return Q.fcall(function(){

        //Throw error if any fields are empty
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

/*
 * This handles updating a record by publishing an updateRecord event.
 * */
var updateRecord = function(req, context)
{
    //Throw error if _id is missing, or if _id is the only field
    return Q.fcall(function()
    {
        if (!verifyUpdateRecord(req.body))
        {
            throw Error('Record must contain _id, and one or more of the following: City, pop, state, and location');
        }
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

/*
* This helper function is used by the updateRecord function to check if _id is present, and at least one other valid field
* is present.
*
* @param record The record to verify
*
* @return True if record is valid, false otherwise
* */
var verifyUpdateRecord = function(record){
    return (record._id && (record.city || record.pop || record.state || (record.loc && record.loc.length == 2)));
};

/*
 * This helper function is used by the addRecord function to check if all fields are present.
 *
 * @param record The record to verify
 *
 * @return True if record is valid, false otherwise
 * */
var verifyAddRecord = function(record)
{
    return (record.city && record.pop && record.state && record.loc && record.loc.length == 2)
};

module.exports = {
    addRecord: addRecord,
    updateRecord: updateRecord
};
