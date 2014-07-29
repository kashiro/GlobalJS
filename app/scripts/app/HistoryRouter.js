(function(){
    'use strict';

    /**
     * @class Global.app.HistoryRouter
     * @extend Global.app.Router
     */
    Global.define('Global.app.HistoryRouter',{

        extend: Global.app.Router,

        historyCtr: null,

        useHash: false,

        defaultPathName: '/',

        init: function(config) {
            var me = this;
            this._super(config);
            this.setHistoryCtr(new Global.app.History({
                useHash: me.getUseHash(),
                defaultPathName: me.getDefaultPathName()
            }));
            this._bind();
        },

        _bind: function() {
            this.getHistoryCtr().addEventListener('change', Global.Functions.bind(this._onChangeState, this));
        },

        _onChangeState: function() {
            var isChangeEvent = true;
            this.start(isChangeEvent);
        },

        /**
         * @override
         * @param {Boolean} isChangeEvent
         */
        start: function(isChangeEvent) {
            var pathName = this.getHistoryCtr().getNormalizePath(),
                res = this._start(pathName, isChangeEvent);
            if(!res){
                this._startDefault();
            }
        },

        _startDefault: function() {
            var pathName = this.getDefaultPathName();
            this.changePage(pathName);
        },

        _start: function(pathName, isChangeEvent) {
            var instance = this._getControllerInstance(pathName);
            if(instance){
                instance.restart();
            }else{
                instance = this._makeController(pathName);
            }
            if(!isChangeEvent && instance){
                this.getHistoryCtr().pushState(pathName);
            }
            return !!instance;
        },

        _getControllerInstance: function(path){
            return this.controllers[path];
        },

        _makeController: function(pathName) {
            var routing  = this.getRouting(),
                Klass    = this._getController(pathName, routing),
                instance = Klass ? new Klass({pathKey: pathName}) : undefined;
            this.controllers[pathName] = instance;
            return instance;
        },

        changePage: function(pathName) {
            this._start(pathName);
        }
    });
})();
