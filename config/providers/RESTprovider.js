'use strict';

var restService = require('../../lib/restService');

module.exports = {
    'type': 'REST',
    'services': {
        '/api/zip/add': [
            {
                'method': 'post',
                'version': '0.1.0',
                'external': true,
                'handler': restService.addRecord
            }
        ],
        '/api/zip/update': [
            {
                'method': 'post',
                'version': '0.1.0',
                'external': true,
                'handler': restService.updateRecord
            }
        ]
    }
};