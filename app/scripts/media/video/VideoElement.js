(function(){

    'use strict';

    /**
     * @class Global.media.video.VideoElement
     * @extend Global.ObservableClass
     */
    Global.define('Global.media.video.VideoElement',{

        elm: null,

        extend: Global.ObservableClass,

        init: function(config) {
            this._super(config);
            this.$elm = $(this.elm);
            this._bind();
            this._load();
        },

        _load: function() {
            this.elm.load();
        },

        _bind: function() {
            this.elm.addEventListener('timeupdate', Global.Functions.bind(this._onTimeupdate, this));
            this.elm.addEventListener('canplay', Global.Functions.bind(this._onCanPlay, this));
        },

        _onCanPlay: function() {
            this.dispatchEvent('canplay');
        },

        _onTimeupdate: function() {
        },

        play: function() {
            var me = this;
            me.elm.play();
        },

        pause: function() {
            this.elm.pause();
        },

        _skip: function(ms) {
            this._setCurrentTime(ms);
        },

        _setCurrentTime: function(ms) {
            this.elm.currentTime = ms/1000;
        },
    });
})();
