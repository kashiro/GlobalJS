(function() {
    'use strict';
    var _history = new Global.app.History();

    describe('Test for app/History.js', function() {

        it('class has those public method', function() {
            expect(_history.isSupported).to.be.a('boolean');
            expect(_history.state).to.be.a('function');
            expect(_history.length).to.be.a('function');
            expect(_history.pushState).to.be.a('function');
            expect(_history.back).to.be.a('function');
            expect(_history.forward).to.be.a('function');
            expect(_history.go).to.be.a('function');
            expect(_history.getNormalizePath).to.be.a('function');
            expect(_history.getPathName).to.be.a('function');
            expect(_history.getHash).to.be.a('function');
        });
    });

    describe('#state', function() {
        it('return history.state if history.state is supported', function() {
            var data = {test: 'test'};
            _history.pushState('/hoge', data, null);
            expect(_history.state()).to.equal(data);
        });
    });

    describe('#_getNoLastSlashPath', function() {
        it('return / if you pass / to this method', function() {
            var res = _history._getNoLastSlashPath('/');
            expect(res).to.equal('/');
        });
        it('return path which has no slash at last child', function() {
            var res = _history._getNoLastSlashPath('/hoge/');
            expect(res).to.equal('/hoge');
            res = _history._getNoLastSlashPath('/hoge');
            expect(res).to.equal('/hoge');
        });
    });

    describe('#_addSlashAtFirst', function() {
        it('return undefined if you pass undefined to this mehod', function() {
            var res = _history._addSlashAtFirst();
            expect(res).to.eql(undefined);
        });
        it('return string which has slash at first child', function() {
            var res = _history._addSlashAtFirst('hoge');
            expect(res).to.equal('/hoge');
            res = _history._addSlashAtFirst('/hoge');
            expect(res).to.equal('/hoge');
        });
    });

    describe('#_isFirstSlash', function() {
        it('return true if the string has slash at fisrt.', function() {
            var res = _history._isFirstSlash('/hoge');
            expect(res).to.be.ok();
        });
        it('return false if the string dose not have slash at fisrt.', function() {
            var res = _history._isFirstSlash('hoge');
            expect(res).to.not.be.ok();
        });
    });

    describe('#_getHashByPathName', function() {
        it('return hash extention if you pass / to this method', function() {
            var res = _history._getHashByPathName('/');
            expect(res).to.equal('!/');
        });
        it('return path which has hash extention.', function() {
            var res = _history._getHashByPathName('/hoge');
            expect(res).to.equal('!/hoge');
            res = _history._getHashByPathName('hoge');
            expect(res).to.equal('!/hoge');
        });
    });

    describe('#_changeHashToPathName', function() {
        it('return / if you pass nothing to this method.', function() {
            var res = _history._changeHashToPathName();
            expect(res).to.equal('/');
        });
        it('return path which dose not have hash extention.', function() {
            var res = _history._changeHashToPathName('#!/hoge');
            expect(res).to.equal('/hoge');
        });
    });

})();
