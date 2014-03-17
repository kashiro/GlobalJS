(function(){
    'use strict';
    /**
     * @class Global.util.SpriteSheet
     * iterate css class at specific interval
     * @extends Global.core.BaseClass
     */
    Global.define('Global.util.SpriteSheet',{

        extend : Global.core.ObservableClass,

        classList: [],

        interval : 500,

        eventName: {
            end: 'end'
        },

        singleRun: false,

        targetSelector: null,

        $elm: null,

        count: 0,

        isFirst: true,

        intervalId: null,

        init: function(config){
            this.listeners = {};
            this.$elm = $(config.targetSelector);
            this._super(config);
        },

        execute: function(){
            var me = this;
            me.intervalId = setInterval(function(){
                if(me.getSingleRun() && (me.count >= me.classList.length)){
                    window.clearInterval(me.intervalId);
                    me.dispatchEvent(me.eventName.end);
                }
                me.doSprite(me.count);
            }, me.interval);
        },

        doSprite: function(count){
            var me = this,
                cls = me.getClass(count);
            me.$elm.removeClass(cls.current);
            me.$elm.addClass(cls.next);
            me.countUp(count);
        },

        countUp: function(count){
            if(!this.getSingleRun() && count === this.classList.length - 1){
                count = 0;
            }else{
                if(this.isFirst){
                    this.isFirst = false;
                    return;
                }else{
                    count += 1;
                }
            }
            this.count = count;

        },

        getClass: function(count){
            var me = this,
                current = me.isFirst ? '' : me.classList[count],
                next    = me.isFirst ? me.classList[count] : me.classList[count + 1];
            return {
                current: current,
                next   : next
            };
        }
    });
})();
