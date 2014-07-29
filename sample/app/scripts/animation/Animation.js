(function(){
    'use strict';

    /**
     * @class Global.animation.Animation
     * This is animation class
     * @extend Global.core.ObservableClass
     */
    Global.define('Global.animation.Animation',{

        extend: Global.core.ObservableClass,

        eventName: {
            /**
             * @event start
             * Fired when this animation is started
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            start: 'start',
            /**
             * @event step
             * Fired when each step
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            step : 'step',
            /**
             * @event end
             * Fired when this animation is ended
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            end  : 'end'
        },

        /**
         * @cfg {Global.animation.Easing} easingfn easing function class
         */
        easingFn: Global.animation.Easing,

        /**
         * @cfg {String|Function} easing name of {@link Global.animation.Easing Easing class} or easing class which get following paramter
         *
         *     - t : current time
         *     - b : begInnIng value
         *     - c : change In value
         *     - d : duration
         */
        easing: 'linear',

        /**
         * @private
         * @cfg {Function} stepfn easing function
         */
        stepFn: null,

        /**
         * @cfg {Number} fps easing fps (defalut : 60)
         */
        fps: 60,

        /**
         * cfg {Number} from beginning value
         */
        from: 0,

        /**
         * cfg {Number} to goal value
         */
        to: 0,

        /**
         * cfg {Number} duration duration of easing
         */
        duration: 0,

        /**
         * @private
         * @cfg {Number} speed
         */
        speed: 0,

        /**
         * @cfg {Number} startTime milliseconds when easing is started
         */
        startTime: null,

        /**
         * @cfg {Number} value value to change by easing
         */
        value: 0,

        /**
         * @cfg {Number} currentTime milliseconds of elapsed time
         */
        currentTime: null,

        /**
         * @private
         */
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

        /*
         * @method start
         * start easing
         */
        start: function() {
            var me = this,
                fn = me.getStepFn(),
                to = me.getTo(),
                from = me.getFrom(),
                startTime = me.getStartTime(),
                speed = me.getSpeed(),
                duration = me.getDuration(),
                value = null;

            startTime = new Date().getTime();
            this.setStartTime(startTime);
            me.dispatchEvent(me.eventName.start, {time: undefined, value: undefined});

            (function loop() {
                value = me.getValue();
                if (value < to) {
                    me.setId(setTimeout(loop, speed));
                }else{
                    me.dispatchEvent(me.eventName.end, {time: me.getCurrentTime(), value: value});
                }
                me._doStart(startTime, from, to, duration, fn);
            }());
        },

        /**
         * @method 
         * @private
         */
        _doStart: function(startTime, from, to, duration, fn) {
            var t = new Date().getTime()-startTime,
                value;
            this.setCurrentTime(t);

            value = fn(t, from, to, duration);
            this.setValue(value);

            this.dispatchEvent(this.eventName.step, {time: t, value: value});
        },

        /**
         * @method stop
         * stop easing
         */
        stop: function() {
            var id = this.getId();
            window.clearTimeout(id);
        },

        /**
         * @method cancel
         * cancel easing
         */
        cancel: function() {
            var value = this.getValue(),
                currentTime = this.getCurrentTime();
            this.stop();
            this.setCurrentTime(null);
            this.setValue(null);
            this.setId(null);
            this.dispatchEvent(this.eventName.end, {time: currentTime, value: value});
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
