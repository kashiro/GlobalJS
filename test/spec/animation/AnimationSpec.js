(function(){
    'use strict';
    /* jshint unused: false */
    describe('Test for animation/Animation.js', function () {

        var Animation = Global.animation.Animation,
            inst;

        it('Class has public methods', function () {
            expect(Animation.prototype.start).to.be.a('function');
            expect(Animation.prototype.stop).to.be.a('function');
            expect(Animation.prototype.cancel).to.be.a('function');
        });

        beforeEach(function() {
            inst = new Animation({
                from: 0,
                to  : 100
            });
        });

        afterEach(function() {
            inst = null;
        });

        describe('#_calcSpeed', function() {
            it('return fps', function() {
                inst._calcSpeed(60);
                expect(inst.getSpeed()).to.equal(1000/60);
            });
        });

        describe('#_setEasing', function() {
            it('if easing property is String we get easing function name from animation/Easing', function() {
                inst._setEasing('easeInQuad');
                var res = inst.getStepFn() === Global.animation.Easing.easeInQuad;
                expect(res).to.be.ok();
            });
            it('if easing property is function we set it in stepFn', function() {
                var fn = function(){};
                inst._setEasing(fn);
                var res = inst.getStepFn() === fn;
                expect(res).to.be.ok();
            });
        });

        describe('#cancel', function() {
            it('set null all properties and call end event', function() {
                inst.setCurrentTime(1);
                inst.setValue(1);
                inst.setId(1);

                expect(inst.getCurrentTime()).to.eql(1);
                expect(inst.getValue()).to.eql(1);
                expect(inst.getId()).to.eql(1);

                var spyStop = sinon.spy(inst, 'stop'),
                    spyEvent = sinon.spy(inst, 'dispatchEvent');

                inst.cancel();

                expect(inst.getCurrentTime()).to.eql(null);
                expect(inst.getValue()).to.eql(null);
                expect(inst.getId()).to.eql(null);

                expect(spyStop.called).to.be.ok();
                expect(spyEvent.calledWith('end')).to.be.ok();
                expect(spyEvent.args[0][1]).to.eql({time: 1, value: 1});

                spyStop.restore();
                spyEvent.restore();
            });
        });

        describe('#stop', function() {
            it('call window.clearTimeout', function() {
                var spy = sinon.spy(window, 'clearTimeout');
                inst.setId(1);

                inst.stop();
                expect(spy.called).to.be.ok();

                spy.restore();
            });
        });

        describe('#_doStart', function() {
            it('calculate time and pass each parameter to easing function', function() {
                var startTime = new Date('Fri Jun 06 2014 08:00:00 GMT+0900 (JST)'),
                    nowTime = new Date('Fri Jun 06 2014 08:00:10 GMT+0900 (JST)'),
                    clock = sinon.useFakeTimers(nowTime.getTime()),
                    spys = {
                        evt: sinon.spy(inst, 'dispatchEvent'),
                        ct: sinon.spy(inst, 'setCurrentTime'),
                        v : sinon.spy(inst, 'setValue'),
                        fn: sinon.stub().returns(10)
                    },
                    from = 0,
                    to = 100,
                    duration = 1000,
                    t = 1000*10;

                inst._doStart(startTime, from, to, duration, spys.fn);

                // setCurrentTime
                expect(spys.ct.args[0][0]).to.equal(t);

                // call fn
                expect(spys.fn.args[0][0]).to.equal(t);
                expect(spys.fn.args[0][1]).to.equal(from);
                expect(spys.fn.args[0][2]).to.equal(to);
                expect(spys.fn.args[0][3]).to.equal(duration);

                // setvalue
                expect(spys.v.args[0][0]).to.equal(10);

                // dispatchevent
                expect(spys.evt.args[0][0]).to.equal('step');
                expect(spys.evt.args[0][1]).to.eql({time: t, value: 10});

                spys.evt.restore();
                spys.ct.restore();
                spys.v.restore();
                clock.restore();
            });
        });

        describe('#start', function() {
            it('set current time property and value and call easing function then call step event', function() {
                var stub = sinon.stub().returns(10),
                    inst = new Animation({
                        from: 0,
                        to: 100,
                        duration: 1000,
                        easing: stub
                    }),
                    startTime = new Date('Fri Jun 06 2014 08:00:00 GMT+0900 (JST)'),
                    clock = sinon.useFakeTimers(startTime.getTime()),
                    spys = {
                        si: sinon.spy(inst, 'setId'),
                        st: sinon.spy(inst, 'setStartTime'),
                        ds: sinon.spy(inst, '_doStart'),
                        evt: sinon.spy(inst, 'dispatchEvent')
                    };

                inst.start();

                // setstarttime
                expect(spys.st.args[0][0]).to.equal(startTime.getTime());

                // dispatchevent (start)
                expect(spys.evt.args[0][0]).to.equal('start');
                expect(spys.evt.args[0][1]).to.eql({time: undefined, value: undefined});

                // setId
                expect(spys.si.called).to.be.ok();

                // _doStart
                expect(spys.ds.args[0][0]).to.equal(startTime.getTime());
                expect(spys.ds.args[0][1]).to.equal(0);
                expect(spys.ds.args[0][2]).to.equal(100);
                expect(spys.ds.args[0][3]).to.equal(1000);
                expect(spys.ds.args[0][4]).to.equal(stub);

                // dispatchevent (end)
                inst.setValue(100);
                clock.tick(1000/60);
                expect(spys.evt.args[2][0]).to.equal('end');
                expect(spys.evt.args[2][1]).to.eql({time: 0, value: 100});

                clock.restore();
                spys.si.restore();
                spys.st.restore();
                spys.ds.restore();
                spys.evt.restore();
            });
        });
    });
})();


