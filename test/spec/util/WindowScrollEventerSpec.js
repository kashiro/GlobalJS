
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

    describe('#remove', function() {
        it('remove object in target array if target object has same name object you passed', function() {
            var test = [
                    {
                        $elm: null,
                        name: 'test1',
                    },
                    {
                        $elm: null,
                        name: 'test2',
                    }
                ],
                inst = new WindowScrollEventer();

            inst.setTargets(test);
            inst.remove('test1');
            var targets = inst.getTargets();
            expect(targets).to.have.length(1);
            expect(targets[0].name).to.equal('test2');
        });
    });

    describe('#add', function() {
        it('add object to tagets array', function() {
            var inst = new WindowScrollEventer();
            inst.setTargets([{$elm: null, name: 'test1'}]);

            inst.add({$elm: null, name: 'test2'});
            expect(inst.getTargets()).to.have.length(2);
        });
    });

    describe('isShown', function() {
        it('return true if the element is showon', function() {
            var inst = new WindowScrollEventer();
            $(document.documentElement).css('height', '300');
            var res = inst.isShown(10, 90);
            expect(res).to.be.ok();
        });
        it('return false if the element is showon', function() {
            var inst = new WindowScrollEventer();
            $(document.documentElement).css('height', '300');
            var res = inst.isShown(10, -10);
            expect(res).to.not.be.ok();
            res = inst.isShown(301,10);
            expect(res).to.not.be.ok();
            res = inst.isShown(301,-10);
            expect(res).to.not.be.ok();
        });
    });

});
