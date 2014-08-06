(function(){
    'use strict';

    /**
     * @class Global.util.CountDown
     * @extends Global.core.ObservableClass
     * @example
     *
     *     var cd = new Global.util.CountDown({
     *         countDown: 5000
     *     }});
     *
     *     cd.addEventListener('timeupdate', function() {
     *         // do something
     *     });
     *     cd.addEventListener('end', function() {
     *         // do something
     *     });
     *
     *     cd.execute();
     */
    Global.define('Global.util.CountDown', {

        extend: Global.core.ObservableClass,

        eventName: {
            /**
             * @event timeupdate
             * fired when time is updated
             * @param {Global.util.CountDown} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            TIMEUPDATE: 'timeupdate',
            /**
             * @event end
             * Fired when this countdown is ended
             * @param {Global.util.CountDown} target this class.
             * @param {String} eventName this event name.
             */
            END: 'end'
        },

        /**
         * @cfg {Number} countDown count down time (ms)
         */
        countDown  : 0,

        /**
         * @cfg {Number} interval interval of count down (ms)
         */
        interval: 100,

        /**
         * @method execute
         * start count down
         */
        execute: function() {
            var me = this,
                count = 0,
                isEnd = false,
                interval = this.getInterval(),
                eventName = this.getEventName();

            window.setTimeout(function(){
                (function loop() {
                    count += interval;
                    isEnd = me._isEnd(count);
                    if(isEnd){
                        me.dispatchEvent(eventName.END, count);
                    }else{
                        me.dispatchEvent(eventName.TIMEUPDATE, count);
                        window.setTimeout(loop, interval);
                    }
                }());
            }, interval);
        },

        _isEnd: function(total) {
            var res = false;
            if(total >= this.getCountDown()){
                res = true;
            }
            return res;
        }

    });

})();
