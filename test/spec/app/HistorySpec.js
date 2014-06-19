(function() {
    'use strict';
    var _History = Global.app.History;

    describe('Test for app/History.js', function() {


        it('class has those public method', function() {
            expect(_History.isSupported).to.be.a('boolean');
            expect(_History.state).to.be.a('function');
            expect(_History.length).to.be.a('function');
            expect(_History.pushState).to.be.a('function');
            expect(_History.back).to.be.a('function');
            expect(_History.forward).to.be.a('function');
            expect(_History.go).to.be.a('function');
        });
    });

    describe('#state', function() {
        it('return history.state if history.state is supported', function() {
            var data = {test: 'test'};
            _History.pushState('/hoge', data, null);
            expect(_History.state()).to.equal(data);
        });
    });
})();
