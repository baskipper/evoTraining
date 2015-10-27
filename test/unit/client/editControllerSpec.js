'use strict';

describe('Edit Controller', function () {
    var expect = chai.expect;

    var ctrl, scope, zipService, log, location, routeParams, sandbox;

    beforeEach(module('evo'));
    //If you want to scope.apply, keep this.
    beforeEach(module('peControllers'));

    // You should only load the modules needed for tests
    // All are loaded here as a matter of convenience
    beforeEach(module('evo.evoTraining.services'));


    beforeEach(inject(function ($rootScope, $controller, _$log_, _zipService_, _$location_) {

        zipService = _zipService_;
        scope = $rootScope.$new(); // Create fresh clean scope
        log = _$log_;
        location = _$location_;
        sandbox = sinon.sandbox.create();
        sandbox.spy(zipService, 'fetchRecord');
        ctrl = $controller('EditCtrl', {
            $scope: scope,
            $routeParams: {id: '1'},
            zipService: zipService,
            $log: log,
            $location: location

        }); // Controller should use our scope as its own

    }));

    it('should exist', function () {
        expect(ctrl).to.not.be.undefined;
    });

    describe('initialization', function(){
        it('should initialize scope variables', function(){
                expect(scope.recordID == 1).to.be.true;
            }
        );

        it('should call zipService\'s fetchRecord function', function(){

            expect(zipService.fetchRecord).to.be.calledOnce;
        })
    });

    describe('cancel function', function(){
        it('should redirect to root', function(){
            sandbox.spy(location, 'path');
            scope.cancel();
            expect(location.path).to.be.calledWith('/')
        })
    });

    describe('update function', function(){
        it('should update and redirect when valid', function(){
            sandbox.stub(scope, 'validUpdate').returns(true);
            sandbox.spy(zipService, 'updateRecord');
            sandbox.spy(location, 'path');
            scope.update();
            expect(zipService.updateRecord).to.be.calledOnce;
            expect(location.path).to.be.calledWith('/')
        });

        it('should show an error when invalid', function(){
            sandbox.stub(scope, 'validUpdate').returns(false);
            sandbox.spy(zipService, 'updateRecord');
            sandbox.spy(location, 'path');
            scope.update();
            expect(zipService.updateRecord).to.not.be.called;
            expect(location.path).to.not.be.called;
            expect(scope.showError).to.be.true;
        });
    });

    describe('validUpdate function', function(){
        it('should return true when all conditions are true', function(){
            scope.record = {
                city: 'birmingham',
                state: 'AL',
                pop: '35244',
                loc: ['-52', '25']
            };
            sandbox.spy(scope, 'validUpdate');
            expect(scope.validUpdate()).to.be.true;
        });

        it('should return false when at least condition is false', function(){
            scope.record = {
                city: 'birmingham',
                state: '',
                pop: '35244',
                loc: ['-52', '25']
            };
            sandbox.spy(scope, 'validUpdate');
            expect(scope.validUpdate()).to.be.false;
        });
    });
});

