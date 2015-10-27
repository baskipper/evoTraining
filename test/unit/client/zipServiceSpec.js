'use strict';

describe('Main Controller', function () {
    var expect = chai.expect;

    var srvc, scope, evoAPI, log,  events, sandbox, q;

    beforeEach(module('evo'));
    //If you want to scope.apply, keep this.

    // You should only load the modules needed for tests
    // All are loaded here as a matter of convenience
    beforeEach(module('evo.evoTraining.services'));


    beforeEach(inject(function ($rootScope, _$log_, _evoAPI_, _zipService_,  _events_, _$q_) {

        events = _events_;
        srvc = _zipService_;
        scope = $rootScope.$new(); // Create fresh clean scope
        evoAPI = _evoAPI_;
        log = _$log_;
        q = _$q_;
        sandbox = sinon.sandbox.create();

    }));

    it('should exist', function () {
        expect(srvc).to.not.be.undefined;
    });

    describe('fetchSeed function', function(){
        it('should call evoAPI\'s findAll function', function(){
            sandbox.stub(evoAPI, 'callFunction').returns(q.when({
                result: {id: 'bananas'}
            }));
            srvc.fetchSeed();
            scope.$apply();
            expect(evoAPI.callFunction.calledWith('findAll')).to.be.true;
            expect(srvc.data.id == 'bananas').to.be.true;
        });
    });

    describe('fetchSmallSeed function', function(){
        it('should call evoAPI\'s getZipByCity function', function(){
            sandbox.stub(evoAPI, 'callFunction').returns(q.when({
                result: {id: 'bananas'}
            }));
            srvc.fetchSmallSeed();
            scope.$apply();
            expect(evoAPI.callFunction.calledWith('getZipByCity', 'BARRE')).to.be.true;
            expect(srvc.data.id == 'bananas').to.be.true;
        });
    });

    describe('fetchRecord function', function(){
        it('should call evoAPI\'s getRecordByID function', function(){
            sandbox.stub(evoAPI, 'callFunction').returns(q.when({
                result: {id: 'bananas'}
            }));
            sandbox.spy(events, 'dispatch');
            srvc.fetchRecord('35244');
            scope.$apply();
            expect(evoAPI.callFunction.calledWith('getRecordByID', '35244')).to.be.true;
            expect(events.dispatch.calledWith(events.types.VIEW_LOADED)).to.be.true;
        });
    });

    describe('updateRecord function', function(){
        it('should call evoAPI\'s getZipByCity function', function(){
            sandbox.stub(evoAPI, 'callFunction').returns(q.when({
                result: {id: 'bananas'}
            }));
            sandbox.spy(srvc, 'fetchSeed');
            srvc.updateRecord('35244');
            scope.$apply();
            expect(evoAPI.callFunction.calledWith('updateRecord', '35244')).to.be.true;
            expect(srvc.fetchSeed.calledOnce).to.be.true;
        });
    });



});

