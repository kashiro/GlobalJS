
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
        this._super(config);
    },

    execute: function(){
        var me = this,
            g = Global,
            config = {
                callback: g.Functions.bind(function(id, count){
                    me.doSprite(count);
                    me.execute();
                }, me, [me.count]),
                interval: me.interval
            },
            callback = g.Functions.createDebounce(config);
        me.intervalId = g.util.RequestAnimationFrame.start(callback);
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
