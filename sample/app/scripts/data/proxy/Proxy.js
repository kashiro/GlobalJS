(function(){
    'use strict';
    /**
     * @class Global.data.proxy.Proxy
     */
    Global.define('Global.data.proxy.Proxy',{

        extend: Global.core.ObservableClass,

        /**
         * @cfg {Boolean} singleRequest whether when this prop is true this class dose not send request while another request is sending.
         */
        singleRequest: true,

        /**
         * @cfg {Boolean} isRequesting whether a request is sending or not
         */
        isRequesting: false,

        init: function(config) {
            this._super(config);
        },

        /**
         * @method get
         * send ajax request
         * @param {Object} param
         */
        get: function(param){
            var me = this,
                args,
                dfd = $.Deferred();

            if(me.getSingleRequest() &&  me.getIsRequesting()){
                dfd.resolve.apply(dfd, [{}, 'error']);
                return;
            }

            me.setIsRequesting(true);
            $.ajax(param)
                .done(function(){
                    args = Global.Array.args2Array(arguments);
                    me.setIsRequesting(false);
                    dfd.resolve.apply(dfd, args);
                })
                .fail(function(){
                    args = Global.Array.args2Array(arguments);
                    me.setIsRequesting(false);
                    dfd.reject.apply(dfd, args);
                });

            return dfd.promise();
        }
    });
})();
