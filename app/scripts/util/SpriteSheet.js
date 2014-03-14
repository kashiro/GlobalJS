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

        intervalId: null,

        init: function(config){
            this.listeners = {};
            this.$elm = $(config.targetSelector);
            config = this._modifyConfig(config);
            this._super(config);
        },

        _modifyConfig: function(config){
            if(config.classList){
                config.classList.unshift('');
            }else{
                config.classList = [];
            }

            return config;
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
            if(this.getSingleRun()){
                this.count = ++count;
                return;
            }

            if(count === this.classList.length - 1){
                count = 0;
            }else{
                count += 1;
            }
            this.count = count;
        },

        getClass: function(count){
            var me = this;
            return {
                current: me.classList[count],
                next   : me.classList[count + 1]
            };
        }
    });
})();
