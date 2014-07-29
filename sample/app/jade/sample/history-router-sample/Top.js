(function(){
    'use strict';

    Global.define('Sample.controller.Top',{

        extend: Global.app.Controller,

        init: function(config) {
            this._super(config);
            $('.pagename').text('page top');
            console.log('init page top');
        },

        restart: function() {
            $('.pagename').text('page top');
            console.log('restart page top');
        }

    });
})();
