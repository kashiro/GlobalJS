(function(){
    'use strict';
    /**
     * @class Global.data.model.Model
     * @extend Global.core.ObservableClass,
     */
    Global.define('Global.data.model.Model',{

        extend: Global.core.ObservableClass,

        eventName: {
            /**
             * @event load
             * Fired when data is loaded
             * @param {Global.data.model.Model} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            LOAD: 'load',
            /**
             * @event error
             * Fired when reqesting is failed
             * @param {Global.data.model.Model} target this class.
             * @param {String} eventName this event name.
             */
            ERROR: 'error'
        },

        /**
         * @cfg {Boolean} isGetCurrentTime whether server get time in xhr or not.
         */
        isGetCurrentTime: false,

        /**
         * @cfg {Date} currentTime current time based on http header when you request
         */
        currentTime: null,

        /**
         * @cfg {Global.data.proxy.Proxy} proxy
         */
        proxy : Global.data.proxy.Proxy,

        /**
         * @cfg {Object} requestSettings request settings of $.ajax method
         *
         *      requestSettings: {
         *          GET: {
         *              type: 'GET',
         *              dataType: 'json'
         *          }
         *      }
         */
        requestSetting: {
            GET: {
                type: 'GET',
                dataType: 'json'
            }
        },

        /**
         * @cfg {Object} requestParam request parameter of $.ajax({data: {}})
         *
         *      requestParam: {
         *          GET: {},
         *          POST: {},
         *          DELETE: {},
         *          PUT: {}
         *      }
         */
        requestParam: {
            GET: {}
        },

        /**
         * @cfg {Object|String} data data of response
         */
        data: null,

        /**
         * @constructor
         */
        init: function(config){
            this._super(config);
            this.proxy = new this.proxy();
        },

        /**
         * @method get
         * get data by using $.ajax
         * @param {Object} parameter of $.ajax(data: {});
         * @return {Object} jquery.Deferred
         */
        get: function(param){
            var _param = this._getRequestObj('GET', param);
            return this._request(_param);
        },

        /**
         * @method
         * @private
         */
        _request: function(param) {
            var me = this,
                dfd = $.Deferred(),
                ajaxDfd = this.proxy.get(param);

            ajaxDfd.done(function(e, state, xhr){
                me._onSuccess(e, state, xhr);
                dfd.resolve(e, state, xhr);
                me.dispatchEvent(me.eventName.LOAD, e);
            });

            ajaxDfd.fail(function(e, state, xhr){
                dfd.reject(e, state, xhr);
                me.dispatchEvent(me.eventName.ERROR, e);
            });

            return dfd.promise();
        },

        /**
         * @method
         * @private
         */
        _getRequestObj: function(type, param) {
            var requestSettings = this.getRequestSetting()[type],
                requestParam = this.getRequestParam()[type],
                _param = $.extend(true, {}, requestParam, param);

            requestSettings.data = _param;
            return requestSettings;
        },

        /**
         * @method
         * @private
         */
        _onSuccess: function(e, state, xhr){
            var time = xhr ? xhr.getResponseHeader('Date') : undefined;
            this._setCurrentTime(time);

            var _data = this._modifyData(e);
            this.setData(_data);
        },

        /**
         * @method
         * @private
         */
        _setCurrentTime: function(time) {
            if(this.getIsGetCurrentTime() && time){
                this.setCurrentTime(new Date(time));
            }
        },

        /**
         * @method
         * @private
         */
        _modifyData: function(data){
            // override if you need.
            return data;
        }
    });
})();
