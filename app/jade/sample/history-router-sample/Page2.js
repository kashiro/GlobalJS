(function(){
    'use strict';

    Global.define('Sample.controller.Page2',{

        extend: Global.app.Controller,

        init: function(config) {
            this._super(config);
            $('.pagename').text('page2');
            console.log('init page 2');
        },

        restart: function() {
            $('.pagename').text('page2');
            console.log('restart page 2');
        }

    });
})();
