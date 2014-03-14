(function(){
    'use strict';

    /**
     * @class Global.app.Router
     */
    Global.define('Global.app.Router',{

        /**
         * routing
         * @cfg {Object} path and controller class
         *
         *     routing: {
         *         '/'    : App.controller.Main,
         *         '/list': App.controller.List
         *     }
         */
        routing: {
        },

        start: function() {
            var pathName = location.pathname,
                routing  = this.getRouting(),
                Klass    = this._getController(pathName, routing),
                instance = Klass ? new Klass() : undefined;
            Klass = instance;
        },

        _getController: function(path, routing){
            var pattern = /\/$/,
                hasLastSlash = pattern.test(path) ? path : path + '/',
                noLastSlash  = pattern.test(path) ? path.slice(0, -1) : path,
                hasLastSlashClass = routing[hasLastSlash],
                noLastSlashClass = routing[noLastSlash];

            return hasLastSlashClass ? hasLastSlashClass : noLastSlashClass;
        }

    });
})();
