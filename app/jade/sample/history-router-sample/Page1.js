(function(){
    'use strict';

    Global.define('Sample.controller.Page1',{

        extend: Global.app.Controller,

        init: function(config) {
            this._super(config);
            $('.pagename').text('page1');
            console.log('init page 1');
        },

        restart: function() {
            $('.pagename').text('page1');
            console.log('restart page 1');
        }

    });
})();
