(function(){
    'use strict';
    /**
     * @class Global.core.ManipulateDomClass
     * @extends Global.core.ObservableClass
     */
    Global.define('Global.core.ManipulateDomClass',{

        extend: Global.core.ObservableClass,

        /**
         * @cfg {Object} refs name and selector
         *
         *     refs: {
         *         main: '.main-panel'
         *     }
         *
         */
        refs: {},

        /**
         * @cfg {Object} event dispatch settings
         *
         * You can set refs names or selectors into each events key.
         *
         *     events: {
         *         main: {
         *             click: '_onClickMain'
         *         },
         *         '.sub': {
         *             click: '_onClickSub'
         *         }
         *     },
         *
         * You can also set more options into event settings.
         *
         *     events: {
         *         sub: {
         *             click: {
         *                 delegate: '.delegate-selector',
         *                 handler : '_onClickSub'
         *             }
         *         }
         *     }
         */
        events: {},

        $elm: null,

        init: function(config){
            this.listeners = {};
            this.elmCaches = {};
            this._super(config);

            this._setElmCaches(this.getRefs());

            if(config && config.events){
                this._applyEvents(config.events);
            }
        },

        getCacheRef: function(key, selector){
            if(!this.$elm){
                return;
            }
            var cached = this.elmCaches[key],
                $elm = !cached && selector ? this.$elm.find(selector): undefined ;
            if(!cached && $elm){
                this.elmCaches[key] = $elm;
            }
            return !$elm || $elm.length === 0 ? undefined : $elm;
        },

        _setElmCaches: function(refs){
            var me = this, key;
            for(key in refs){
                me.getCacheRef(key, refs[key]);
            }
        },

        _applyEvents: function(events){
            var me = this,
                $ref,
                eName,
                param;

            $.each(events, function(refsKey, val){
                $ref = me.getCacheRef(refsKey);
                if(!$ref){
                    return false;
                }
                eName = Global.keys(val)[0];
                param = val[eName];

                if(Global.isObject(param) && param.delegate){
                    $ref.on(eName, param.delegate, $.proxy(me[param.handler], me));
                }else if(Global.isString(param)){
                    $ref.on(eName, $.proxy(me[param], me));
                }

            });
        }

    });
})();
