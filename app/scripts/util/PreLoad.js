(function(){
    'use strict';

    /**
     * @class Global.util.PreLoad
     * This class preload images
     * @extends Global.core.ObservableClass
     *
     *
     *     var imgs = [
     *           'hoge.png',
     *           'fuga.png',
     *           'piyo.png'
     *         ],
     *         instance = new Global.util.PreLoad({srcs: imgs});
     *
     *     // listen load progress.
     *     instance.addEventListener('load', function(e){
     *         console.log(e.data.current); // current image element
     *         console.log(e.data.percentage); // progress of loading (percentage)
     *     });
     *
     *     // listen load end.
     *     instance.addEventListener('loadend', function(e){
     *        console.log('load end');
     *     });
     *
     *     instance.load();
     *
     */
    Global.define('Global.util.PreLoad',{

        extend: Global.core.ObservableClass,

        srcs: [],

        imgs : [],

        cacheBuster: null,

        eventName: {
            /**
             * @event
             * Fired when the image loaded on.
             * @param {Global.util.PreLoad} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Object} data.current Img element which is loaded.
             * @param {Number} data.percentage progress of loading (percentage)
             */
            load   : 'load',
            /**
             * @event
             * @param {Global.util.PreLoad} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Object} data.current Img element which is loaded.
             * @param {Number} data.percentage progress of loading (percentage)
             */
            loadEnd: 'loadend'
        },

        /**
         * @method init
         * @constructor
         */
        init: function(config) {
            this.srcs = [];
            this.imgs = [];
            this.cacheBuster = 'cache=' + new Date().getTime();
            this._super(config);
        },

        /**
         * @method load
         * Preload images
         * @param {Object} config
         * @param {String[]} srcs image path list
         */
        load: function(){
            var me = this,
                srcs = this.getSrcs(),
                orgImg = document.createElement('img'),
                cacheBuster = this.getCacheBuster(),
                list = [];

            Global.core.Array.each(srcs, function(index, src){
                list.push({
                    img : orgImg.cloneNode(),
                    src : src,
                    cacheBusterSrc: me._addCacheBuster(src, cacheBuster)
                });
            });
            this._prepareImages(list);
        },

        /**
         * @private
         */
        _prepareImages: function(imgs) {
            var me = this;
            Global.core.Array.each(imgs, function(index, obj){
                obj.img.onload = function(e){
                    me._onLoad(e, this);
                };
                obj.img.src = obj.cacheBusterSrc;

                // for cached
                if(obj.img.complete){
                    me._onLoad({currentTarget: obj.img}, this);
                }
            });
        },
        /**
         * @private
         */
        _addCacheBuster: function(url, cacheBuster){
            return url.indexOf('?') !== -1 ? '&' + cacheBuster : '?' + cacheBuster;
        },
        _removeCacheBuster: function(url, cacheBuster){
            var targetIndex = url.indexOf(cacheBuster) -1;
            return url.slice(0, targetIndex);
        },
        /**
         * @private
         */
        _onLoad: function(e, context){
            var srcs = this.getSrcs(),
                imgs = this.getImgs(),
                cacheBuster = this.getCacheBuster(),
                percentage, eData, current, orgSrc, tmp = {};

            if(e){
                current = e.currentTarget;
            }else{
                // for ie8
                current = context;
            }

            orgSrc = this._removeCacheBuster(current.src, cacheBuster);
            tmp[orgSrc] = current;
            imgs.push(tmp);
            this.setImgs(imgs);

            percentage = this._getPercentage(srcs.length, imgs.length);
            eData = this._getEventData(current, percentage);

            this._doDispatchEvent(eData);
        },
        /**
         * @private
         */
        _doDispatchEvent: function(data){
            var eventName = this.getEventName();
            this.dispatchEvent(eventName.load, data);
            if(data.percentage === 100){
                this.dispatchEvent(eventName.loadEnd, data);
            }
        },
        /**
         * @private
         */
        _getPercentage: function(maxLength, currentLength){
            return (currentLength / maxLength) * 100;
        },
        /**
         * @private
         */
        _getEventData: function(current, percentage){
            return {
                current: current,
                percentage: percentage
            };
        }
    });
})();
