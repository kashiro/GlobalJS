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
                Klass    = routing[pathName],
                instance = new Klass();
            Klass = instance;
        }

    });
})();
