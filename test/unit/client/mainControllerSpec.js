'use strict';

describe('Some Controller', function () {
    var expect = chai.expect;

    var ctrl, scope, evoAPI, zipService, log, location, events;

    beforeEach(module('evo'));
    //If you want to scope.apply, keep this.
    beforeEach(module('peControllers'));

    // You should only load the modules needed for tests
    // All are loaded here as a matter of convenience
    beforeEach(module('evo.evoTraining.services'));


    beforeEach(inject(function ($rootScope, $controller, _$log_, _evoAPI_, _zipService_, _$location_, _events_) {

        events = _events_;
        zipService = _zipService_;
        scope = $rootScope.$new(); // Create fresh clean scope
        evoAPI = _evoAPI_;
        log = _$log_;
        location = _$location_;
        ctrl = $controller('MainController', {
            $scope: scope,
            events: events,
            zipService: zipService,
            evoAPI: evoAPI,
            $log: log,
            $location: location

        }); // Controller should use our scope as its own

    }));

    it('should exist', function () {
        expect(ctrl).to.not.be.undefined;
    });
});

