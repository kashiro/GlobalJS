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

        fn: {
            show: function(topPosition){
                return topPosition > 0 && topPosition < document.documentElement.clientHeight;
            },
            hide: function(topPosition) {
                return topPosition < 0 || topPosition > document.documentElement.clientHeight;
            }
        },

        targets: [],

        /**
         * @constructor
         * @property {Object} config
         * @property {Object} config.targets target of event listener.
         * @property {Object} config.targets.type when the event is dispatch.
         * @property {Object} config.targets.$elm target element.
         * @property {Object} config.targets.name event name
         * @property {Object} config.targets.fn judgement function when the event is dispatch
         */
        init: function(config) {
            this._super(config);
            this.setTargets(this._modifyTargets(config.targets));
        },

        /**
         * @private
         */
        _modifyTargets: function(targets) {
            var me = this,
                list = Global.isArray(targets) ? targets : [targets],
                res = [];
            Global.Array.each(list, function(index, target){
                if(target.type){
                    target.fn = me._getFn(target.type);
                }
                res.push(target);
            });
            return res;
        },

        /**
         * @private
         */
        _getFn: function(type){
            var res,
                fn = this.getFn();
            if(type === 'show'){
                res = fn.show;
            }else if(type === 'hide'){
                res = fn.hide;
            }else{
                console.error('you set unknown type.');
            }
            return res;
        },

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
                topPosition;
            Global.Array.each(targets, function(index, target) {
                topPosition = target.$elm[0].getBoundingClientRect().top;
                if(target.fn(topPosition)){
                    me.dispatchEvent(target.name, {target: target});
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
            var res = this.getTargets().concat(this._modifyTargets(targets));
            this.setTargets(res);
        },

        /**
         * @method remove
         */
        remove: function(name) {
            var me = this,
                targets = this.getTargets(),
                res = [];
            Global.each(targets, function(index, target){
                if(target.name !== name){
                    res.push(target);
                }
            });
            me.setTargets(res);
        }
    });
})();


