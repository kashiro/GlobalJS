(function(){
    'use strict';

    Global.define('Sample.controller.Page3',{

        extend: Global.app.Controller,

        init: function(config) {
            this._super(config);
            $('.pagename').text('page3');
            console.log('init page 3');
        },

        restart: function() {
            $('.pagename').text('page3');
            console.log('restart page 3');
        }

    });
})();
