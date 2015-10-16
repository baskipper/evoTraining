var fetch = require('../../lib/fetch');

module.exports = {
    type: 'Socket',
    services: {
        getZipByCity: {
            handler: fetch.getZipByCity
        },
        findAll: {
            handler: fetch.findAll
        },
        addRecord: {
            handler: fetch.addRecord
        },
        updateRecord: {
            handler: fetch.updateRecord
        },
        getRecordByID: {
            handler: fetch.getRecordByID
        },
        removeRecord: {
            handler: fetch.removeRecord
        }


    },
    emitters: {
        events: [
            {
                'event': 'addRecord',
                'room': '*'
            },
            {
                'event': 'updateRecord',
                'room': '*'
            }
        ]
    }

};