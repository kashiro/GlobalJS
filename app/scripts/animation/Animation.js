(function(){
    'use strict';

    /**
     * @class Global.animation.Animation
     * This is animation class
     * @extend Global.core.ObservableClass
     */
    Global.define('Global.animation.Animation',{

        extend: Global.core.ObservableClass,

        EVENT_NAME: {
            /**
             * @event start
             * Fired when this animation is started
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            START: 'start',
            /**
             * @event step
             * Fired when each step
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            STEP : 'step',
            /**
             * @event end
             * Fired when this animation is ended
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            END  : 'end'
        },

        easingFn: Global.animation.Easing,

        easing: 'linear',

        stepFn: null,

        fps: 60,

        from: 0,

        to: 0,

        duration: 0,

        speed: 0,

        now: null,

        value: null,

        currentTime: null,

        id: null,

        /**
         * @constructor
         * @param {Object} config of this class
         * @param {Number} config.fps frame per second
         * @param {Number} config.from start value
         * @param {Number} config.to end value
         * @param {Number} config.duration duration
         * @param {String|Function} config.easing easing name of or easing function
         */
        init: function(config) {
            this._super(config);
            this._calcSpeed(this.getFps());
            this._setEasing(this.getEasing());
        },

        start: function() {
            var me = this,
                fn = me.getStepFn(),
                to = me.getTo(),
                from = me.getFrom(),
                now = me.getNow(),
                speed = me.getSpeed(),
                duration = me.getDuration(),
                value = null,
                t;

            this.setNow(new Date().getTime());

            (function loop() {
                if (from < to) {
                    me.setId(setTimeout(loop, speed));
                }else{
                    me.dispatchEvent(me.EVENT_NAME.END, {time: t, value: value});
                }

                t = new Date().getTime()-now;
                me.setCurrentTime(t);

                value = fn(t, from, to, duration);
                me.setValue(value);

                me.dispatchEvent(me.EVENT_NAME.STEP, {time: t, value: value});

            }());
        },

        stop: function() {
            var id = this.getId();
            window.clearTimeout(id);
        },

        cancel: function() {
            this.stop();
            this.setCurrentTime(null);
            this.setValue(null);
            this.setId(null);
            this.dispatchEvent(this.EVENT_NAME.END, {time: this.getCurrentTime(), value: this.getValue()});
        },

        /*
         * @method
         * @private
         */
        _calcSpeed: function(fps) {
            this.setSpeed(1000/fps);
        },

        /**
         * @method
         * @private
         */
        _setEasing: function(easing) {
            var fn,
                easingFn = this.getEasingFn();

            if(Global.isFunction(easing)){
                fn = easing;
            }else if(Global.isString(easing)){
                fn = easingFn[easing];
            }
            this.setStepFn(fn);
        }

    });
})();
