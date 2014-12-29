(function(){
    'use strict';

    /**
     * @class Global.util.WindowScrollEventer
     * This tis a EventDispatcher the event depends on the top position of the element
     * @extend Global.ObservableClass,
     */
    Global.define('Global.util.WindowScrollEventer',{

        extend: Global.ObservableClass,

        eventName: {
            jquery: 'windowscrolleventer'
        },

        isShown: function(top, bottom){
            return bottom > 0 && top < document.documentElement.clientHeight;
        },

        /**
         *
         * @property {Object[]} config
         * @property {Object} config.$elm target element.
         * @property {Object} config.name event name
        */
        targets: null,

        /**
         * @method start
         */
        start: function() {
            $(window).on('scroll.' + this.getEventName().jquery, $.proxy(this._onScroll, this));
        },

        /**
         * @private
         */
        _onScroll: function () {
            this._judgeTrigger(this.getTargets());
        },

        /**
         * @private
         */
        _judgeTrigger: function(targets){
            var me = this,
                bound, top, bottom;
            Global.Array.each(targets, function(index, target) {
                bound = target.$elm[0].getBoundingClientRect();
                top = bound.top;
                bottom = bound.bottom;
                if(me.isShown(top, bottom)){
                    me.dispatchEvent(target.name + 'show', {target: target});
                }else{
                    me.dispatchEvent(target.name + 'hide', {target: target});
                }
            });
        },

        /**
         * @method stop
         */
        stop: function () {
            $(window).off('scroll.' + this.getEventName().jquery);
        },

        /**
         * @method add
         */
        add: function(targets) {
            var res = this.getTargets().concat(targets);
            this.setTargets(res);
        },

        /**
         * @method remove
         */
        remove: function(name) {
            var me = this,
                targets = this.getTargets(),
                res = [];
            Global.Array.each(targets, function(index, target){
                if(target.name !== name){
                    res.push(target);
                }
            });
            me.setTargets(res);
        }
    });
})();
