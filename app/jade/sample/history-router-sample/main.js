$(function(){
    'use strict';
    Sample.Router.start();
    $('.page1').on('click', function() {
        Sample.Router.changePage('/page1');
    });
    $('.page2').on('click', function() {
        Sample.Router.changePage('/page2');
    });
    $('.page3').on('click', function() {
        Sample.Router.changePage('/page3');
    });
});
