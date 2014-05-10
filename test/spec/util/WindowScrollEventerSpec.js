
'use strict';

describe('Test for util/WindowScrollEventer.js', function () {

    var WindowScrollEventer = Global.util.WindowScrollEventer,
        $elm, inst;

    beforeEach(function(){
        $elm = $('<div></div>');
    });

    afterEach(function(){
        $elm = null;
        inst = null;
    });

    it('class has those public method', function () {
        expect(WindowScrollEventer.prototype.start).to.be.a('function');
        expect(WindowScrollEventer.prototype.stop).to.be.a('function');
        expect(WindowScrollEventer.prototype.add).to.be.a('function');
        expect(WindowScrollEventer.prototype.remove).to.be.a('function');
    });

    describe('#_getFn', function () {
        it('return show function if you set "show" type', function(){
            inst = new WindowScrollEventer({targets: {name: 'test', $elm: $elm, type: 'show'}});
            var res = inst._getFn('show') === inst.getFn().show;
            expect(res).to.be.ok();
        });
        it('return hide function if you set "hid" type', function(){
            inst = new WindowScrollEventer({targets: {name: 'test', $elm: $elm, type: 'hide'}});
            var res = inst._getFn('hide') === inst.getFn().hide;
            expect(res).to.be.ok();
        });
    });

    describe('#_modifyTargets', function() {
        it('if you set nonArray target are wrap Array', function () {
            inst = new WindowScrollEventer({targets: {name: 'test', $elm: $elm, type: 'show'}});
            expect(inst.getTargets()).to.be.an('array');
        });
        it('if you set object that contain type property #_getFn should be called', function() {
            inst = new WindowScrollEventer({targets: {name: 'test', $elm: $elm, type: 'show'}});
            var spy = sinon.spy(inst, '_getFn');

            inst._modifyTargets({name: 'test', $elm: $elm, type: 'show'});
            expect(spy.called).to.be.ok();
        });
        it('if you set object that dose not contain type property #_getFn should not be called', function() {
            inst = new WindowScrollEventer({targets: {name: 'test', $elm: $elm}});
            var spy = sinon.spy(inst, '_getFn');

            inst._modifyTargets({name: 'test', $elm: $elm});
            expect(spy.called).to.not.be.ok();
        });
 
    });
});
