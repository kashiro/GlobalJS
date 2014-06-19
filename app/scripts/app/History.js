(function() {
    'use strict';

    /**
     * @class Global.app.History
     * HTML5 History API utility.
     * if the API dose not supported this class use hash flagment.
     * @extend Global.core.ObservableClass
     */
    Global.define('Global.app.History',{

        singleton: true,

        extend: Global.core.ObservableClass,

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
         * @public
         */
        state: function() {
            return this.getData();
        },

        /**
         * @method length
         * get state length
         * @public
         */
        length: function() {
            return this.isSupported ? history.length : null;
        },

        /**
         * @constructor
         */
        init: function(config) {
            this._super(config);
            this._bind();
        },

        /**
         * @method pushState
         * change url
         * if History API dose not supported use change hash flagment
         * @public
         */
        pushState: function(path, state, title) {
            var he = this.getHashExtention();
            this.setData(state);
            if(this.isSupported){
                history.pushState(state, title, path);
                this._onPopState();
            }else{
                location.hash = he + path;
            }
        },

        /**
         * @method forward
         * same as history.forward()
         * @public
         */
        forward: function() {
            history.forward();
        },

        /**
         * @method back
         * same as history.back()
         * @public
         */
        back: function() {
            history.back();
        },

        /**
         * @method go
         * same as history.go()
         * @public
         */
        go: function() {
            history.back();
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
            var key = window.addEventListener ? 'addEventListener' : 'attachEvent';
            window[key]('hashchange', Global.Functions.bind(this._onPopState, this));
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
        }

    });

})();
