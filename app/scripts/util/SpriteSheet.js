(function(){
    'use strict';
    /**
     * @class Global.util.SpriteSheet
     * iterate css class at specific interval
     * @extends Global.core.BaseClass
     */
    Global.define('Global.util.SpriteSheet',{

        classList: [],

        interval : 500,

        targetSelector: null,

        $elm: null,

        count: 0,

        intervalId: null,

        init: function(config){
            this.$elm = $(config.targetSelector);
            config = this._modifyConfig();
            this._super(config);
        },

        _modifyConfig: function(config){
            config.classList = config.classList ? config.classList.unshift('') : [];
            return config;
        },

        execute: function(){
            var me = this;
            me.intervalId = setInterval(function(){
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
