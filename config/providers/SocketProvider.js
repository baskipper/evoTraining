var fetch = require('../../lib/fetch');

module.exports = {
    type: 'Socket',
    services: {
        getZipByCity: {
            handler: fetch.getZipByCity
        }
    }

};