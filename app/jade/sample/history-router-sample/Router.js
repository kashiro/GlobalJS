(function(){
    'use strict';

    Global.define('Sample.Router',{

        extend: Global.app.HistoryRouter,

        singleton: true,

        useHash: true,

        defaultPathName: '/history-router-sample',

        routing: {
            '/': Sample.controller.Top,
            '/page1': Sample.controller.Page1,
            '/page2': Sample.controller.Page2,
            '/page3': Sample.controller.Page3
        }
    });
})();
