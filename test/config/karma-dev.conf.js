module.exports = function (config) {
    'use strict';
    config.set({
        basePath: "../",
        frameworks: ['mocha'],
        files: [
            '../node_modules/chai/chai.js',
            '../node_modules/chai-as-promised/lib/chai-as-promised.js',
            '../node_modules/sinon/lib/sinon.js',
            '../node_modules/sinon/lib/sinon/util/core.js',
            '../node_modules/sinon/lib/sinon/extend.js',
            '../node_modules/sinon/lib/sinon/typeOf.js',
            '../node_modules/sinon/lib/sinon/times_in_words.js',
            '../node_modules/sinon/lib/sinon/spy.js',
            '../node_modules/sinon/lib/sinon/call.js',
            '../node_modules/sinon/lib/sinon/behavior.js',
            '../node_modules/sinon/lib/sinon/stub.js',
            '../node_modules/sinon/lib/sinon/mock.js',
            '../node_modules/sinon/lib/sinon/assert.js',
            '../node_modules/sinon/lib/sinon/collection.js',
            '../node_modules/sinon/lib/sinon/test.js',
            '../node_modules/sinon/lib/sinon/test_case.js',
            '../node_modules/sinon/lib/sinon/match.js',
            '../node_modules/sinon/lib/sinon/sandbox.js',
            '../node_modules/sinon/lib/sinon/format.js',
            '../node_modules/sinon/lib/sinon/log_error.js',
            '../node_modules/sinon-chai/lib/sinon-chai.js',
            '../content/shared/public/monkeynaut/dist/js/bundle-core.js',
            '../content/shared/public/angular/angular.js',
            '../content/shared/public/angular-mocks/angular-mocks.js',
            '../content/shared/public/jquery/jquery-2.1.0.min.js',

            '../content/shared/public/angular-bootstrap/ui-bootstrap-tpls.js',
            '../content/shared/public/js/**/*.js',
            '../content/shared/public/jSignature/src/jSignature.js',
            '../content/web/public/js/services/*.js',
            '../content/web/public/js/controllers/**/*.js',
            '../content/web/public/js/filters/*.js',
            '../content/web/public/js/directives/*.js',
            '../content/web/public/js/filters/*.js',
            '../content/web/public/js/app.js',
            'unit/client/*.js'
        ],
        autoWatch: true,
        singleRun: false,
        browsers: ['PhantomJS'],
        reporters: ['progress', 'junit'],
        junitReporter: {
            outputFile: './out/unit_desktop.xml',
            suite: 'unit'
        }
    });
};