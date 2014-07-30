(function() {
    'use strict';

    /**
     * @class Global.app.History
     * HTML5 History API utility.
     * if the API dose not supported this class use hash flagment.
     * @extend Global.core.ObservableClass
     */
    Global.define('Global.app.History',{

        extend: Global.core.ObservableClass,

        defaultPathName: '',

        changeHash: false,

        eventName: {
            change: 'change'
        },

        /**
         * @cfg {Boolean} isSupported whether browser spport History API or not
         */
        isSupported: history && !!history.pushState,

        /**
         * @cfg {Object} data
         */
        data: null,

        /**
         * @cfg {String} hashextention /# + ${hashextention}
         */
        hashExtention: '!/',

        /**
         * @method state
         * get state data
         */
        state: function() {
            return this.getData();
        },

        /**
         * @method length
         * get state length
         */
        length: function() {
            return this.isSupported ? history.length : null;
        },

        /**
         * @constructor
         */
        init: function(config) {
            this._super(config);
            this._setUseHash(this.useHash);
            this._bind();
        },

        _setUseHash: function(useHash) {
            if(useHash){
                this.isSupported = false;
            }
        },

        /**
         * @method pushState
         * change url
         * if History API dose not supported use change hash flagment
         */
        pushState: function(path, state, title) {
            var _path,
                dpn = this.getDefaultPathName();
            this.setData(state);
            if(this.isSupported){
                _path = dpn + path;
                history.pushState(state, title, _path);
            }else{
                this.setChangeHash(true);
                location.hash = this._getHashByPathName(path);
            }
        },

        /**
         * @method forward
         * same as history.forward()
         */
        forward: function() {
            history.forward();
        },

        /**
         * @method back
         * same as history.back()
         */
        back: function() {
            history.back();
        },

        /**
         * @method go
         * same as history.go()
         */
        go: function() {
            history.go();
        },

        /**
         * @method getNormalizePath
         * if your browser support history api return pathname from location.pathname
         * if your browser dose not supported history api return pathname from location.hash
         * the return path have slash at first child and dose not have slash at last child.
         */
        getNormalizePath: function() {
            var res;
            if(this.isSupported){
                res = this.getPathName();
            }else{
                res = this.getHash();
            }
            return res;
        },

        /**
         * @method getPathName
         * @return pathname which has slash at first child and excluding default pathname
         */
        getPathName: function() {
            var pathName = location.pathname;
            pathName = pathName.split(this.getDefaultPathName())[1];
            pathName = this._addSlashAtFirst(pathName);
            return this._getNoLastSlashPath(pathName);
        },

        /**
         * @method getHash
         * @return pathname which has slash at first child and excluding hash extention (e.g. !#/)
         */
        getHash: function() {
            var hash = location.hash,
                path = this._changeHashToPathName(hash);
            return this._getNoLastSlashPath(path);
        },

        _changeHashToPathName: function(hash) {
            var prefix = '#' + this.getHashExtention(),
                pathName;
            if(!hash){
                pathName = '/';
            }else{
                pathName = hash.split(prefix)[1];
                pathName = this._addSlashAtFirst(pathName);
            }
            return pathName;
        },

        _getHashByPathName: function(path) {
            var he = this.getHashExtention(),
                res;
            if(path === '/'){
                res = he;
            }else{
                res = he + (this._isFirstSlash(path) ? path.substring(1) : path);
            }
            return res;
        },

        /**
         * @private
         */
        _bind: function() {
            if(this.isSupported){
                window.addEventListener('popstate', Global.Functions.bind(this._onPopState, this));
            }else{
                this._bindHashChange();
            }
        },

        /**
         * @private
         */
        _bindHashChange: function() {
            var me = this,
                key = window.addEventListener ? 'addEventListener' : 'attachEvent';
            window[key]('hashchange', function(e) {
                if(!me.getChangeHash()){
                    me._onPopState(e);
                }
                me.setChangeHash(false);
            });
        },

        /**
         * @private
         */
        _onPopState: function(e) {
            var data = {
                state: this.state(),
                raw : e
            };
            this.dispatchEvent(this.getEventName().change, data);
        },
        _isFirstSlash: function(str) {
            var reg = /^\//;
            return reg.test(str);
        },

        _addSlashAtFirst: function(str) {
            var res;
            if(Global.isUndefined(str)){
                res = undefined;
            }else{
                if(!this._isFirstSlash(str)){
                    str  = '/' + str;
                }
                res = str;
            }
            return str;
        },

        _getNoLastSlashPath: function(path){
            var reg = /\/$/;
            if(path === '/'){
                return path;
            }else{
                return reg.test(path) ? path.slice(0, -1) : path;
            }
        }

    });

})();
