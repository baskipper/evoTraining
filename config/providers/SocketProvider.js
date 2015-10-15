var fetch = require('../../lib/fetch');

module.exports = {
    type: 'Socket',
    services: {
        getZipByCity: {
            handler: fetch.getZipByCity
        },
        findAll:
        {
            handler: fetch.findAll
        }
    },
    emitters:
    {
        events:[{
            'event': 'addRecord',
            'room': '*'
        }]
    }

};