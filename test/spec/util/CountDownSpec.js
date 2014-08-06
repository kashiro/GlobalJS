
'use strict';

describe('Test for util/CountDown.js', function () {

    var inst = new Global.util.CountDown({
        countDown: 500
    }),
    clock;

    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it('class has those public method', function () {
        expect(inst.execute).to.be.a('function');
    });

    describe('#_isEnd', function () {
        it('return true if total rather than target count.', function() {
            expect(inst._isEnd(500)).to.be.ok();
            expect(inst._isEnd(501)).to.be.ok();
        });
        it('return false if total smaller than target count.', function() {
            expect(inst._isEnd(499)).to.not.be.ok();
        });
    });

    describe('#execute', function() {
        it('fire end event if count down is ended.', function() {
            var spy = sinon.spy(inst, 'dispatchEvent');
            inst.execute();

            // 100 ms
            clock.tick(100);
            expect(spy.calledWith('end')).to.not.be.ok();

            // 200 ms
            clock.tick(100);
            expect(spy.calledWith('end')).to.not.be.ok();

            // 300 ms
            clock.tick(100);
            expect(spy.calledWith('end')).to.not.be.ok();

            // 400 ms
            clock.tick(100);
            expect(spy.calledWith('end')).to.not.be.ok();

            // 500 ms
            clock.tick(100);
            expect(spy.calledWith('end')).to.be.ok();

            spy.restore();
        });
        it('fire timeupdate event if count down is executed.', function() {
            var spy = sinon.spy(inst, 'dispatchEvent');
            inst.execute();

            // 100 ms
            clock.tick(100);
            expect(spy.args[0]).to.eql(['timeupdate', 100]);

            // 200 ms
            clock.tick(100);
            expect(spy.args[1]).to.eql(['timeupdate', 200]);

            // 300 ms
            clock.tick(100);
            expect(spy.args[2]).to.eql(['timeupdate', 300]);

            // 400 ms
            clock.tick(100);
            expect(spy.args[3]).to.eql(['timeupdate', 400]);

            // 500 ms
            clock.tick(100);
            expect(spy.args[4]).to.not.eql(['timeupdate', 500]);
            expect(spy.calledWith('end')).to.be.ok();

            spy.restore();
        });
    });
});
