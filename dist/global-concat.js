/**
 * @class Class
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  this.Class = function(){};

  Class.extend = function(prop) {
    var _super = this.prototype;

    initializing = true;
    var prototype = new this();
    initializing = false;

    for (var name in prop) {
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            this._super = _super[name];

            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    function Class() {
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    Class.prototype = prototype;

    Class.prototype.constructor = Class;

    Class.extend = arguments.callee;

    return Class;
  };
})();


/**
 * @class  Global
 * This class is base of this framework.
 * It provide definition method and so on.
 * @singleton
 */
(function (win) {

    'use strict';

    var Global = {

        /**
         * @method define
         * define module in specific name space
         * @param  {String} namespace name space of module
         * @param  {Function} definition module definition
         */
        define: function (namespace, definition) {
            var modified = this._modifyDefinition(definition),
                module = this._getModule(modified),
                klass  = this._generateClass(module, namespace),
                alias = definition.alias;

            Global.regist(namespace, klass);

            if(definition.alias){
                Global.regist(alias, this._getRegistedClass(namespace));
            }
        },

        /**
         * @method regist
         * create name space and set passed object
         * @param  {String} nameSpace namespace to set passed object
         * @param  {Object} obj       object to set that namespace
         */
        regist: function (nameSpace, obj) {
            var nameList = nameSpace.split('.'),
                l = nameList.length,
                i = 0,
                name,
                currentObj = win;

            for(; i < l; i++) {
                name = nameList[i];
                if(typeof currentObj[name] === 'undefined') {
                    if(i === nameList.length - 1) {
                        currentObj[name] = obj;
                    } else {
                        currentObj[name] = {};
                    }
                }
                currentObj = currentObj[name];
            }
        },

        /**
         * @method keys
         * get object keys
         * @param {Object} obj targe object
         * @return {String[]} array of object keys
         */
        keys: function(obj){
            var isObject = Global.isObject(obj),
                hasObjectKeys = Object.keys,
                res = [],
                key;
            if(!isObject){
                res = [];
            }
            if(hasObjectKeys){
                res = Object.keys(obj);
            }else{
                for(key in obj){
                    if(obj.hasOwnProperty(key)){
                        res.push(key);
                    }
                }
            }
            return res;
        },
        /**
         * @method isObject
         * @param {Object} obj target object
         * @return {Boolean} whether target is Object or not
         */
        isObject: function(obj){
            return obj === Object(obj);
        },
        /**
         * @method isUndefined
         * @param {Object} obj target object
         * @return {Boolean} whether target is undefined or not
         */
        isUndefined: function(obj){
            return obj === void 0;
        },
        /**
         * @method isFunction
         * @param {Object} obj target object
         * @return {Boolean} whether target is Function or not
         */
        /**
         * @method isString
         * @param {Object} obj target object
         * @return {Boolean} whether target is String or not
         */
        /**
         * @method isNumber
         * @param {Object} obj target object
         * @return {Boolean} whether target is Number or not
         */
        /**
         * @method isDate
         * @param {Object} obj target object
         * @return {Boolean} whether target is Date or not
         */
         /**
         * @method isArray
         * @param {Object} obj target object
         * @return {Boolean} whether target is Array or not
         */
        _makeWhetherFun: function(){
            var me = this,
                list = ['Function', 'String', 'Number', 'Date', 'Array'];
            $.each(list, function(index, name){
                me['is' + name] = function(obj){
                    return Object.prototype.toString.call(obj) === '[object ' + name + ']';
                };
            });
        },
        /**
         * @method _getRegistedClass
         * @private
         */
        _getRegistedClass: function(nameSpace) {
            var nameList = nameSpace.split('.'),
                l = nameList.length,
                i = 0,
                name,
                currentObj = win;

            for(; i < l; i++){
                name = nameList[i];
                currentObj = currentObj[name];
            }
            return currentObj;
        },

        /**
         * @method _getModule
         * @private
         */
        _getModule: function(definition){
            var module, parent;
            if(this.isUndefined(definition.extend)){
                parent = Global.core.BaseClass;
            }else if(this.isFunction(definition.extend)){
                parent = definition.extend;
            }else{
                console.error('you should set sub class of lib/Class.js');
                return;
            }
            module = parent.extend(definition);
            module.$parentClass = parent;
            return module;
        },
        /**
         * @method _generateClass
         * @private
         */
        _generateClass: function(Module, namespace){
            var klass;
            if(Module.prototype.singleton){
                klass = new Module();
            }else{
                klass = Module;
            }
            klass.$className = namespace;
            return klass;
        },
        /**
         * @method _modifyDefinition
         * @private
         */
        _modifyDefinition: function(definition) {
            var modified;
            modified = this._addGetSetter(definition);
            return modified;
        },
        /**
         * @method _addGetSetter
         * @private
         */
        _addGetSetter: function(definition) {
            var tmpProp,
                newPropName,
                key;
            for(key in definition){
                tmpProp = definition[key];
                if(!this.isFunction(tmpProp) && definition.hasOwnProperty(key)){
                    newPropName = this._conbineUpperStr('get', key);
                    definition[newPropName] = this._getGetSetFunc('get', definition, key);
                    newPropName = this._conbineUpperStr('set', key);
                    definition[newPropName] = this._getGetSetFunc('set', definition, key);
                }
            }
            return definition;
        },
        /**
         * @method _conbineUpperStr
         * @private
         */
        _conbineUpperStr: function(prefix, name){
            var firstUpper = name.charAt(0).toUpperCase(),
                theOthers = name.slice(1);
            return prefix + firstUpper + theOthers;
        },
        /**
         * @method _getGetSetFunc
         * @private
         */
        _getGetSetFunc: function(type, definition, propName){
            var func;
            if(type === 'get'){
                func = function(){
                    // return definition[propName];
                    return this[propName];
                };
            }else{
                func = function(value) {
                    // definition[propName] = value;
                    this[propName] = value;
                };
            }
            return func;
        }
    };

    /*--------------------------------
    * private
    --------------------------------*/
    Global.regist('Global', Global);
    Global._makeWhetherFun();
}(window));

(function(){
    'use strict';

    /**
     * @class Global.core.BaseClass
     * Base class of this library
     * @alternateClassName Global.BaseClass
     * @extends Class
     */
    Global.define('Global.core.BaseClass',{

        alias: 'Global.BaseClass',

        extend: Class,

        /**
         * @method init
         * This method apply config to own properites.
         * @constructor
         */
        init: function(config){
            this.config = config;
            this._applyConfig(config);
        },

        /**
         * @method _applyConfig
         * @private
         */
        _applyConfig: function(config){
            // define instance properties
            for(var key in config) {
                this[key] = config[key];
            }
        }
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.event.Event
     * event object
     * @extends Global.core.BaseClass
     */
    Global.define('Global.event.Event',{

        /**
         * @method init
         * @constructor
         */
        init: function(config) {
            this._super(config);
            this.target = config.target;
            this.type = config.type;
            this.data = config.data;
        }
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.event.EventDispatcher
     * manipulate publish / subscribe interface
     * @extends Global.core.BaseClass
     *
     *     var instance = new Global.event.EventDispatcher(),
     *         callback = Global.core.Functions.bind(console.log);
     *
     *     instance.addEventListener('hoge', callback);
     *     instance.dispatchEvent('hoge'); // log argumetns
     *
     */
    Global.define('Global.event.EventDispatcher',{

        /**
         * @method init
         * @constructor
         */
        init: function(config) {
            this.listeners = {};
            this._super(config);
        },

        /**
        * @method addEventListener
        * Add listener
        * @param {String} type Event type
        * @param {Function} listener Callback function
        *
        */
        addEventListener: function(type, listener){
            (this.listeners[type] || (this.listeners[type] = [])).push(listener);
        },

        /**
        * @method hasEventListener
        * Return true this class listens passed type of event.
        * @param {String} type Event type
        * @return {Boolean}
        */
        hasEventListener: function(type){
            return !!this.listeners[type];
        },

        /**
        * @method  removeEventListener
        * Remove listener
        * @param {String} type Event type
        * @param {Function} listener Callback function
        */
        removeEventListener: function(type, listener){
            var fncs = this.listeners[type];
            if(fncs){
                for (var i = fncs.length-1; i >= 0; i--){
                    if (fncs[i] === listener){
                        fncs.splice(i, 1);
                    }
                }
            }
        },

        /**
        * @method  onesEventListener
        * Event you passed is only called once.
        * @param {String} type Event type
        * @param {Function} listener Callback function
        */
        onesEventListener: function(type, listener){
            var self = this,
                callback = function (event){
                    self.removeEventListener(type, callback);
                    listener.apply(self, [event]);
                    callback = null;
                };
            this.addEventListener(type, callback);
        },

        /**
        * @method dispatchEvent
        * Dispatch event message.
        * @param {String} type Event type
        * @param {Object} data Attach data
        */
        dispatchEvent: function(type, data){
            var fncs = this.listeners[type],
                event = new Global.event.Event({target:this, type: type, data: data});

            if(fncs){
                fncs = fncs.concat();
                for (var i = 0, n = fncs.length; i < n; i++){
                    fncs[i].apply(this, [event]);
                }
            }
        }
    });
})();

(function(){
    'use strict';
    /**
     * @class Global.core.ObservableClass
     * class to extend to get observal method
     * @extends Global.event.EventDispatcher
     * @alternateClassName Global.ObservableClass
     */
    Global.define('Global.core.ObservableClass',{

        alias: 'Global.ObservableClass',

        extend: Global.event.EventDispatcher,

        init: function(config){
            this.listeners = {};
            this._super(config);
        }
    });
})();

(function(){
    'use strict';
    /**
     * @class Global.core.ManipulateDomClass
     * @alternateClassName Global.ObservableClass
     * @extends Global.core.ObservableClass
     */
    Global.define('Global.core.ManipulateDomClass',{

        alias: 'Global.ObservableClass',

        extend: Global.core.ObservableClass,

        /**
         * @cfg {Object} refs name and selector
         *
         *     refs: {
         *         main: '.main-panel'
         *     }
         *
         */
        refs: {},

        /**
         * @cfg {Object} event dispatch settings
         *
         * You can set refs names or selectors into each events key.
         *
         *     events: {
         *         main: {
         *             click: '_onClickMain'
         *         },
         *         '.sub': {
         *             click: '_onClickSub'
         *         }
         *     },
         *
         * You can also set more options into event settings.
         *
         *     events: {
         *         sub: {
         *             click: {
         *                 delegate: '.delegate-selector',
         *                 handler : '_onClickSub'
         *             }
         *         }
         *     }
         */
        events: {},

        $elm: null,

        init: function(config){
            this.listeners = {};
            this.elmCaches = {};
            this._super(config);

            this._setElmCaches(this.getRefs());

            this._applyEvents(this.getEvents());
        },

        /**
         * @method getCacheRef
         * Return jQuery Object if this class can find element by using key or selector you passed.
         * @param {String} key element cache key you can set in refs property.
         * @param {String} (optional) selector to find element.
         * @param {jQuery|undefined} if Class can get jQuery object return it.
         */
        getCacheRef: function(key, selector){
            if(!this.$elm){
                return;
            }
            var cached = this.elmCaches[key],
                $elm = !cached && selector ? this.$elm.find(selector): undefined;

            if($elm && $elm.length === 0){
                $elm = undefined;
            }

            if(!cached){
                this.elmCaches[key] = $elm;
            }

            return this.elmCaches[key];
        },

        /**
         * @method set jquery cache in this class
         * @private
         * @param {Object} refs refs object
         * See also {@link #refs}
         */
        _setElmCaches: function(refs){
            var me = this, key;
            for(key in refs){
                me.getCacheRef(key, refs[key]);
            }
        },

        /**
         * @method apply event you want suscribe.
         * @private
         * @param {Object} events refs object
         * See also {@link #events}
         */
        _applyEvents: function(events){
            var me = this,
                $ref,
                eName,
                param;

            $.each(events, function(refsKey, val){
                $ref = me.getCacheRef(refsKey);
                if(!$ref){
                    return false;
                }
                eName = Global.keys(val)[0];
                param = val[eName];

                if(Global.isObject(param) && param.delegate){
                    $ref.on(eName, param.delegate, $.proxy(me[param.handler], me));
                }else if(Global.isString(param)){
                    $ref.on(eName, $.proxy(me[param], me));
                }

            });
        }

    });
})();

(function(){
    'use strict';

    /**
     * @class Global.core.Array
     * Wrapper class for Array
     * @extends Global.core.BaseClass
     * @alternateClassName Global.Arra
     * @singleton
     *
     */
    Global.define('Global.core.Array',{

        alias: 'Global.Array',

        singleton: true,

        /**
         * @method args2Array
         * Returns array which arguments is convert to.
         * @param {Object} arguments arguments.
         * @return {Array} converted array object.
         *
         *     // return Array object.
         *     function awesomeFunc(){
         *         var ary = Global.core.Array.args2Array(arguments);
         *     }
         *
         */
        args2Array: function(args){
            if(args instanceof Array){
                return args;
            }else{
                return Array.prototype.slice.call(args);
            }
        },

        /**
         * @method map2Array
         * Returns array which map{key:value} is convert to.
         * @param {Object} map The map to be converted.
         * @return {Array} converted array object.
         *
         *     var map = {
         *         hoge: 'hoge',
         *         fuga: 'fuga',
         *         piyo: 'piyo'
         *     },
         *     list = Global.core.Array.map2Array(map);
         *
         *     console.log(list); // ['hoge', 'fuga', 'piyo'];
         *
         */
        map2Array: function(map) {
            var list = [],
                key;
            for(key in map){
                list.push(map[key]);
            }
            return list;
        },

        /**
         * @method each
         * Iterates an array.
         * @param {Object} map The map to be converted.
         *
         *     var list = ['hoge', 'fuga', 'piyo'];
         *
         *     Global.core.Array.each(list, function(index, value){
         *         console.log(index); // 0, 1, 2
         *         console.log(value); // 'hoge', 'fuga', 'piyo'
         *     });
         *
         */
        each: function(list, callback){
            var l = list.length,
                i = 0;
            for(; i < l; i++){
                callback(i, list[i]);
            }
        },

        /**
         * @method contains
         * Checks whether or not the given array contains the specified item.
         * @param {Boolean} return true when the given array contains the specified item.
         *
         *     var list = ['hoge', 'fuga', 'piyo'];
         *
         *     // return true.
         *     console.log(Global.core.Array.contains(list, 'fuga'));
         */
        contains: function(list, target) {
            var i = 0,
                l = list.length;
            for(; i < l; i++){
                if(list[i] === target){
                    return true;
                }
            }
            return false;
        },

        /**
         * @method remove
         */
        remove: function(target, index, count){
            var _count = count || 1;
            target.splice(index, _count);
        },

        /**
         * @method makeRandomList
         * @param {Array} list to make ramdom
         * @param {Number} num length of new ramdom list. default: length of list
         */
        makeRandomList: function(list, num) {
            var _num = num || list.length,
                randoms = Global.math.Random.getRandomNumList(_num),
            res = [];
            Global.Array.each(randoms, function(index, random) {
                res.push(list[random]);
            });
            return res;
        }

    });
})();

(function(){
    'use strict';
    /**
     * @class Global.core.Functions
     * Wrapper class for Array
     * @extends Global.core.BaseClass
     * @alternateClassName Global.Functions
     * @singleton
     */
    Global.define('Global.core.Functions',{

        alias: 'Global.Functions',

        singleton: true,

        /**
         * @method createDebouce
         * make debounce instance
         * @return {Global.util.functions.Debounce} debounce instance
         *
         *     // this functions is called 1 times 5 seconds.
         *     var config = {
         *             callback: function(value){console.log(value);},
         *             interval: 1000 * 5
         *         },
         *         debounce = Global.core.Functions.createDebounce(config);
         *
         *     window.addEventListener('resize', debounce.execute);
         *
         */
        createDebounce: function(config){
            var instance = new Global.util.functions.Debounce(config);
            return function() {
                var ags = Global.core.Array.args2Array(arguments);
                instance.execute.apply(instance, ags);
            };
        },

        /**
         * @method  bind
         * bind context
         * @param  {Function} callback function to be fired
         * @param  {Object}   context  context of callback
         * @param  {Array}    args     parameter to be passed to callback
         * @return {Function}          function contain callback
         *
         *     var callback = Global.core.Functions.bind(console.log);
         *     window.addEventListener('resize', callback);
         *
         */
        bind: function(callback, context, args){
            var ary;
            return function(){
                ary = Global.core.Array.args2Array(arguments);
                if(Global.isArray(args)){
                    ary = ary.concat(args);
                }
                callback.apply(context, ary);
            };
        }
    });
})();

(function(){
    'use strict';
    /**
     * @class
     * class for manipulate Map(key, value) data
     */
    Global.define('Global.data.Map',{

        singleton: true,

        /**
         * @method list2Map
         * convert list to Map
         * @param  {Array} data to be converted
         * @param  {String} key object key
         * @return {Array}      converted object
         */
        list2Map: function(data, key) {
            var map = {};
            $.each(data, function(index, obj){
                map[obj[key]] = obj;
            });
            return map;
        },
    });
})();

(function(){
    'use strict';
    /**
     * @class Global.data.proxy.Proxy
     */
    Global.define('Global.data.proxy.Proxy',{

        extend: Global.core.ObservableClass,

        /**
         * @cfg {Boolean} singleRequest whether when this prop is true this class dose not send request while another request is sending.
         */
        singleRequest: true,

        /**
         * @cfg {Boolean} isRequesting whether a request is sending or not
         */
        isRequesting: false,

        init: function(config) {
            this._super(config);
        },

        /**
         * @method get
         * send ajax request
         * @param {Object} param
         */
        get: function(param){
            var me = this,
                args,
                dfd = $.Deferred();

            if(me.getSingleRequest() &&  me.getIsRequesting()){
                dfd.resolve.apply(dfd, [{}, 'error']);
                return;
            }

            me.setIsRequesting(true);
            $.ajax(param)
                .done(function(){
                    args = Global.Array.args2Array(arguments);
                    me.setIsRequesting(false);
                    dfd.resolve.apply(dfd, args);
                })
                .fail(function(){
                    args = Global.Array.args2Array(arguments);
                    me.setIsRequesting(false);
                    dfd.reject.apply(dfd, args);
                });

            return dfd.promise();
        }
    });
})();

(function(){
    'use strict';
    /**
     * @class Global.data.model.Model
     * @extend Global.core.ObservableClass,
     */
    Global.define('Global.data.model.Model',{

        extend: Global.core.ObservableClass,

        eventName: {
            /**
             * @event load
             * Fired when data is loaded
             * @param {Global.data.model.Model} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            LOAD: 'load',
            /**
             * @event error
             * Fired when reqesting is failed
             * @param {Global.data.model.Model} target this class.
             * @param {String} eventName this event name.
             */
            ERROR: 'error'
        },

        /**
         * @cfg {Boolean} isGetCurrentTime whether server get time in xhr or not.
         */
        isGetCurrentTime: false,

        /**
         * @cfg {Date} currentTime current time based on http header when you request
         */
        currentTime: null,

        /**
         * @cfg {Global.data.proxy.Proxy} proxy
         */
        proxy : Global.data.proxy.Proxy,

        /**
         * @cfg {Object} requestSettings request settings of $.ajax method
         *
         *      requestSettings: {
         *          GET: {
         *              type: 'GET',
         *              dataType: 'json'
         *          }
         *      }
         */
        requestSetting: {
            GET: {
                type: 'GET',
                dataType: 'json'
            }
        },

        /**
         * @cfg {Object} requestParam request parameter of $.ajax({data: {}})
         *
         *      requestParam: {
         *          GET: {},
         *          POST: {},
         *          DELETE: {},
         *          PUT: {}
         *      }
         */
        requestParam: {
            GET: {}
        },

        /**
         * @cfg {Object|String} data data of response
         */
        data: null,

        /**
         * @constructor
         */
        init: function(config){
            this._super(config);
            this.proxy = new this.proxy();
        },

        /**
         * @method get
         * get data by using $.ajax
         * @param {Object} parameter of $.ajax(data: {});
         * @return {Object} jquery.Deferred
         */
        get: function(param){
            var _param = this._getRequestObj('GET', param);
            return this._request(_param);
        },

        /**
         * @method
         * @private
         */
        _request: function(param) {
            var me = this,
                dfd = $.Deferred(),
                ajaxDfd = this.proxy.get(param);

            ajaxDfd.done(function(e, state, xhr){
                me._onSuccess(e, state, xhr);
                dfd.resolve(e, state, xhr);
                me.dispatchEvent(me.eventName.LOAD, e);
            });

            ajaxDfd.fail(function(e, state, xhr){
                dfd.reject(e, state, xhr);
                me.dispatchEvent(me.eventName.ERROR, e);
            });

            return dfd.promise();
        },

        /**
         * @method
         * @private
         */
        _getRequestObj: function(type, param) {
            var requestSettings = this.getRequestSetting()[type],
                requestParam = this.getRequestParam()[type],
                _param = $.extend(true, {}, requestParam, param);

            requestSettings.data = _param;
            return requestSettings;
        },

        /**
         * @method
         * @private
         */
        _onSuccess: function(e, state, xhr){
            var time = xhr ? xhr.getResponseHeader('Date') : undefined;
            this._setCurrentTime(time);

            var _data = this._modifyData(e);
            this.setData(_data);
        },

        /**
         * @method
         * @private
         */
        _setCurrentTime: function(time) {
            if(this.getIsGetCurrentTime() && time){
                this.setCurrentTime(new Date(time));
            }
        },

        /**
         * @method
         * @private
         */
        _modifyData: function(data){
            // override if you need.
            return data;
        }
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.math.Random
     * utility for get random numbers.
     * @extends Global.core.BaseClass
     * @singleton
     */
    Global.define('Global.math.Random',{

        singleton: true,

        /**
         * return random number.
         * @param  {Number} max max number you want to get.
         * @return {Number} random number which smaller than number you passed.
         */
        getRandomNum: function(max) {
            return Math.floor( Math.random() * max + 1 );
        },

        /**
         * return random number list.
         * @param  {Number} max max number you want to get.
         * @return {Array} random number list.
         */
        getRandomNumList: function(num) {
            var i, j, tmp, random = new Array(num);
            random[0] = 0;

            for(i = num - 1; i > 0; i--){
                j = Math.floor(Math.random() * (i+1));
                tmp = random[i] || i;
                random[i] = random[j] || j;
                random[j] = tmp;
            }
            return random;
        }
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.animation.Easing
     * This is animation easing class
     * @extend Global.core.BaseClass
     * @singleton
     * @see http://www.gizma.com/easing/
     */
    Global.define('Global.animation.Easing',{

        singleton: true,

        /* jshint ignore:start */
        linear: function(t, b, c, d) {
            return c*t/d + b;
        },
        easeInQuad: function(t, b, c, d) {
            t /= d;
            return c*t*t + b;
        },
        easeOutQuad: function(t, b, c, d) {
            t /= d;
            return -c * t*(t-2) + b;
        },
        easeInOutQuad: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        },
        easeInCubic: function(t, b, c, d) {
            t /= d;
            return c*t*t*t + b;
        },
        easeOutCubic: function(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        },
        easeInOutCubic: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        },
        easeInQuart: function(t, b, c, d) {
            t/= d;
            return c*t*t*t*t + b;
        },
        easeOutQuart: function(t, b, c, d) {
            t /= d;
            t--;
            return -c * (t*t*t*t - 1) + b;
        },
        easeInOutQuart: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t + b;
            t -= 2;
            return -c/2 * (t*t*t*t - 2) + b;
        },
        easeInQuint: function(t, b, c, d) {
            t /= d;
            return c*t*t*t*t*t + b;
        },
        easeOutQuint: function(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t*t*t + 2) + b;
        },
        easeInSine: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function(t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function(t, b, c, d) {
            return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
        },
        easeOutExpo: function(t, b, c, d) {
            return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
        },
        easeInOutExpo: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
            t--;
            return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
        },
        easeInCirc: function(t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t*t) - 1) + b;
        },
        easeOutCirc: function(t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t*t) + b;
        },
        easeInOutCirc: function(t, b, c, d) {
            t /= d/2;
            if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            t -= 2;
            return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
        }
        /* jshint ignore:end */
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.animation.Animation
     * This is animation class
     * @extend Global.core.ObservableClass
     */
    Global.define('Global.animation.Animation',{

        extend: Global.core.ObservableClass,

        eventName: {
            /**
             * @event start
             * Fired when this animation is started
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            start: 'start',
            /**
             * @event step
             * Fired when each step
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            step : 'step',
            /**
             * @event end
             * Fired when this animation is ended
             * @param {Global.animation.Animation} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             * @param {Number} data.time current time
             * @param {Number} data.value current value
             */
            end  : 'end'
        },

        /**
         * @cfg {Global.animation.Easing} easingfn easing function class
         */
        easingFn: Global.animation.Easing,

        /**
         * @cfg {String|Function} easing name of {@link Global.animation.Easing Easing class} or easing class which get following paramter
         *
         *     - t : current time
         *     - b : begInnIng value
         *     - c : change In value
         *     - d : duration
         */
        easing: 'linear',

        /**
         * @private
         * @cfg {Function} stepfn easing function
         */
        stepFn: null,

        /**
         * @cfg {Number} fps easing fps (defalut : 60)
         */
        fps: 60,

        /**
         * cfg {Number} from beginning value
         */
        from: 0,

        /**
         * cfg {Number} to goal value
         */
        to: 0,

        /**
         * cfg {Number} duration duration of easing
         */
        duration: 0,

        /**
         * @private
         * @cfg {Number} speed
         */
        speed: 0,

        /**
         * @cfg {Number} startTime milliseconds when easing is started
         */
        startTime: null,

        /**
         * @cfg {Number} value value to change by easing
         */
        value: 0,

        /**
         * @cfg {Number} currentTime milliseconds of elapsed time
         */
        currentTime: null,

        /**
         * @private
         */
        id: null,

        /**
         * @constructor
         * @param {Object} config of this class
         * @param {Number} config.fps frame per second
         * @param {Number} config.from start value
         * @param {Number} config.to end value
         * @param {Number} config.duration duration
         * @param {String|Function} config.easing easing name of or easing function
         */
        init: function(config) {
            this._super(config);
            this._calcSpeed(this.getFps());
            this._setEasing(this.getEasing());
        },

        /*
         * @method start
         * start easing
         */
        start: function() {
            var me = this,
                fn = me.getStepFn(),
                to = me.getTo(),
                from = me.getFrom(),
                startTime = me.getStartTime(),
                speed = me.getSpeed(),
                duration = me.getDuration(),
                value = null;

            startTime = new Date().getTime();
            this.setStartTime(startTime);
            me.dispatchEvent(me.eventName.start, {time: undefined, value: undefined});

            (function loop() {
                value = me.getValue();
                if (value < to) {
                    me.setId(setTimeout(loop, speed));
                }else{
                    me.dispatchEvent(me.eventName.end, {time: me.getCurrentTime(), value: value});
                }
                me._doStart(startTime, from, to, duration, fn);
            }());
        },

        /**
         * @method 
         * @private
         */
        _doStart: function(startTime, from, to, duration, fn) {
            var t = new Date().getTime()-startTime,
                value;
            this.setCurrentTime(t);

            value = fn(t, from, to, duration);
            this.setValue(value);

            this.dispatchEvent(this.eventName.step, {time: t, value: value});
        },

        /**
         * @method stop
         * stop easing
         */
        stop: function() {
            var id = this.getId();
            window.clearTimeout(id);
        },

        /**
         * @method cancel
         * cancel easing
         */
        cancel: function() {
            var value = this.getValue(),
                currentTime = this.getCurrentTime();
            this.stop();
            this.setCurrentTime(null);
            this.setValue(null);
            this.setId(null);
            this.dispatchEvent(this.eventName.end, {time: currentTime, value: value});
        },

        /*
         * @method
         * @private
         */
        _calcSpeed: function(fps) {
            this.setSpeed(1000/fps);
        },

        /**
         * @method
         * @private
         */
        _setEasing: function(easing) {
            var fn,
                easingFn = this.getEasingFn();

            if(Global.isFunction(easing)){
                fn = easing;
            }else if(Global.isString(easing)){
                fn = easingFn[easing];
            }
            this.setStepFn(fn);
        }

    });
})();

(function(){
    'use strict';
    /**
     * @class Global.util.functions.Debounce
     * debounce instance it is usefull to reduce functions call.
     * @extends Global.core.BaseClass
     *
     *
     *     var config = {
     *             callback: console.log,
     *             scope   : console,
     *             interval: 1000
     *         },
     *         instance = Global.util.functions.Debounce(config);
     *
     *     window.addEventListener('resize', instance.execute);
     */
    Global.define('Global.util.functions.Debounce',{

        /**
         * @method init
         * @constructor
         * @param {Object} config config of this class.
         * @param {Function} config.callback callback.
         * @param {Object} config.scope scope of callback
         * @param {Number} config.interval interval time. (ms) default is 1000ms.
         * @param {Boolean} config.immediate wheter callback is execute immediate or not.
         */
        init: function(config) {
            this.timer = null;
            this._super(config);
        },

        /**
         * @method execute
         * Execute function you passed.
         */
        execute: function() {
            var config = {
                callback: this.callback,
                args    : Global.core.Array.args2Array(arguments),
                scope   : this.scope || this,
                interval: this.interval || 1000,
                immediate: this.immediate
            };

            if (this.timer) {
                return false;
            }
            this._switchExecute(config);
        },
        /**
         * @method _switchExecute
         * @private
         */
        _switchExecute: function(config) {
            if (config.immediate) {
                this._executeBefore(config.callback, config.args, config.scope, config.interval);
            } else {
                this._executeAfter(config.callback, config.args, config.scope, config.interval);
            }
        },
        /**
         * @method _executeBefore
         * @private
         */
        _executeBefore: function(callback, args, scope, interval) {
            var me = this;
            callback.apply(scope, args);
            me.timer = setTimeout(function() {
                me.timer = null;
            }, interval);
        },
        /**
         * @method _executeAfter
         * @private
         */
        _executeAfter: function(callback, args, scope, interval) {
            var me = this;
            me.timer = setTimeout(function() {
                callback.apply(scope, args);
                me.timer = null;
            }, interval);
        }
    });
})();

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

        imgs : {},

        cacheBuster: null,

        useCacheBuster: false,

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
            this.imgs = {};
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
            var me = this,
                useCacheBuster = me.getUseCacheBuster();
            Global.core.Array.each(imgs, function(index, obj){
                obj.img.onload = function(e){
                    me._onLoad(e, this);
                };
                obj = me._addImgSrc(useCacheBuster, obj);
                // for cached
                if(obj.img.complete){
                    me._onLoad({currentTarget: obj.img}, this);
                }
            });
        },
        /**
         * @private
         */
        _addImgSrc: function(useCacheBuster, obj){
            obj.img.src = useCacheBuster ? obj.cacheBusterSrc : obj.src;
            return obj;
        },
        /**
         * @private
         */
        _addCacheBuster: function(url, cacheBuster){
            var cache = url.indexOf('?') !== -1 ? '&' + cacheBuster : '?' + cacheBuster;
            return url + cache;
        },
        /**
         * @private
         */
        _removeCacheBuster: function(url, cacheBuster){
            var targetIndex = url.indexOf(cacheBuster) -1;
            return url.slice(0, targetIndex);
        },
        /**
         * @private
         */
        _getImgSrc: function(useCacheBuster, cacheBuster, target){
            var orgSrc = useCacheBuster ? this._removeCacheBuster(target.src, cacheBuster) : target.src;
            return orgSrc;
        },
        /**
         * @private
         */
        _onLoad: function(e, context){
            var me = this,
                srcs = this.getSrcs(),
                imgs = this.getImgs(),
                cacheBuster = this.getCacheBuster(),
                current = e ? e.currentTarget : context, // if ie8 current is context
                percentage, eData, orgSrc;

            orgSrc = me._getImgSrc(me.getUseCacheBuster(), cacheBuster, current);
            imgs[orgSrc] = current;
            this.setImgs(imgs);

            percentage = this._getPercentage(srcs.length, Global.keys(imgs).length);
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

(function(){
    'use strict';
    /**
     * @class Global.util.SpriteSheet
     * iterate css class at specific interval
     * @extends Global.core.ObservableClass,
     */
    Global.define('Global.util.SpriteSheet',{

        extend : Global.core.ObservableClass,

        /**
         * @cfg {Array} class list to replace css class
         */
        classList: [],

        /**
         * @cfg {Number} interval msec to do sprite
         */
        interval : 500,

        /**
         * @cfg {String} name of event
         */
        eventName: {
            /* @event Fired sprite is finished*/
            end: 'end',
            /* @event Fired sprite is executed*/
            change: 'change'
        },

        /**
         * @cfg {String} selector of target element
         */
        targetSelector: null,

        /**
         * @cfg {Object} target jQuery element
         */
        $elm: null,

        /**
         * @cfg {Number} total count of sprite
         */
        totalCount: 0,

        /**
         * @cfg {Number} limit of sprite
         */
        limit: null,

        count: 0,

        /**
         * @cfg {Number} interval id to use cancel interval
         */
        intervalId: null,

        /**
         * @constructor
         */
        init: function(config){
            this.$elm = $(config.targetSelector);
            this._super(config);
        },

        /**
         * @method execute sprite
         */
        execute: function(){
            var me = this;
            me.intervalId = setInterval(function(){
                me._doSprite(me.count);
                me._countUp(me.count);
                me.dispatchEvent(me.getEventName().change, me.getTotalCount());
                if(Global.isNumber(me.getLimit()) && me.getTotalCount() === me.getLimit()){
                    window.clearInterval(me.intervalId);
                    me.setTotalCount(0);
                    me.dispatchEvent(me.getEventName().end);
                }
            }, me.interval);
        },

        /**
         * @private
         */
        _doSprite: function(count){
            var me = this,
                cls = me._getClass(count);
            me.$elm.removeClass(cls.current);
            me.$elm.addClass(cls.next);
        },

        /**
         * @private
         */
        _countUp: function(count){
            this.count = (1+count) % (this.classList.length);
            this.totalCount = ++this.totalCount;
        },

        /**
         * @private
         */
        _getClass: function(count){
            var me = this,
                nextIndex = (1 + count) % this.classList.length,
                current = me.classList[count],
                next    = me.classList[nextIndex];
            return {
                current: current,
                next   : next
            };
        }
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.util.RequestAnimationFramae
     * @extends Global.core.BaseClass
     * @singleton
     */
    Global.define('Global.util.RequestAnimationFrame', {

        singleton: true,

        init: function(config){
            this.polyfill();
            this._super(config);
        },

        start: function(callback){
            return this.raf.apply(window, [callback]);
        },
        cancel: function(id){
            return this.caf(id);
        },

        polyfill: function(){
            var win = window,
                raf = win.requestAnimationFrame ||
                      win.webkitRequestAnimationFrame ||
                      win.mozRequestAnimationFrame ||
                      win.msRequestAnimationFrame ||
                      win.oRequestAnimationFrame ||
                      function(func) { setTimeout(func, 1000 / 60); },
                caf = win.cancelAnimationFrame ||
                      win.cancelRequestAnimationFrame ||
                      win.webkitCancelAnimationFrame ||
                      win.webkitCancelRequestAnimationFrame ||
                      win.mozCancelAnimationFrame ||
                      win.mozCancelRequestAnimationFrame ||
                      win.msCancelAnimationFrame ||
                      win.msCancelRequestAnimationFrame ||
                      win.oCancelAnimationFrame ||
                      win.oCancelRequestAnimationFrame ||
                      function(id) { clearTimeout(id); };
            this.raf = raf;
            this.caf = caf;
        }
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.util.WindowScrollEventer
     * This tis a EventDispatcher the event depends on the top position of the element
     * @extend Global.ObservableClass,
     */
    Global.define('Global.util.WindowScrollEventer',{

        extend: Global.ObservableClass,

        eventName: {
            jquery: 'windowscrolleventer'
        },

        isShown: function(top, bottom){
            return bottom > 0 && top < document.documentElement.clientHeight;
        },

        /**
         *
         * @property {Object[]} config
         * @property {Object} config.$elm target element.
         * @property {Object} config.name event name
        */
        targets: null,

        /**
         * @method start
         */
        start: function() {
            $(window).on('scroll.' + this.getEventName().jquery, $.proxy(this._onScroll, this));
        },

        /**
         * @private
         */
        _onScroll: function () {
            this._judgeTrigger(this.getTargets());
        },

        /**
         * @private
         */
        _judgeTrigger: function(targets){
            var me = this,
                bound, top, bottom;
            Global.Array.each(targets, function(index, target) {
                bound = target.$elm[0].getBoundingClientRect();
                top = bound.top;
                bottom = bound.bottom;
                if(me.isShown(top, bottom)){
                    me.dispatchEvent(target.name + 'show', {target: target});
                }else{
                    me.dispatchEvent(target.name + 'hide', {target: target});
                }
            });
        },

        /**
         * @method stop
         */
        stop: function () {
            $(window).off('scroll.' + this.getEventName().jquery);
        },

        /**
         * @method add
         */
        add: function(targets) {
            var res = this.getTargets().concat(targets);
            this.setTargets(res);
        },

        /**
         * @method remove
         */
        remove: function(name) {
            var me = this,
                targets = this.getTargets(),
                res = [];
            Global.Array.each(targets, function(index, target){
                if(target.name !== name){
                    res.push(target);
                }
            });
            me.setTargets(res);
        }
    });
})();

(function(){
    'use strict';

    /**
     * @class Global.util.CountDown
     * @extends Global.core.ObservableClass
     * @example
     *
     *     var cd = new Global.util.CountDown({
     *         countDown: 5000
     *     }});
     *
     *     cd.addEventListener('timeupdate', function() {
     *         // do something
     *     });
     *     cd.addEventListener('end', function() {
     *         // do something
     *     });
     *
     *     cd.execute();
     */
    Global.define('Global.util.CountDown', {

        extend: Global.core.ObservableClass,

        eventName: {
            /**
             * @event timeupdate
             * fired when time is updated
             * @param {Global.util.CountDown} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            TIMEUPDATE: 'timeupdate',
            /**
             * @event end
             * Fired when this countdown is ended
             * @param {Global.util.CountDown} target this class.
             * @param {String} eventName this event name.
             */
            END: 'end'
        },

        /**
         * @cfg {Number} countDown count down time (ms)
         */
        countDown  : 0,

        /**
         * @cfg {Number} interval interval of count down (ms)
         */
        interval: 100,

        /**
         * @method execute
         * start count down
         */
        execute: function() {
            var me = this,
                count = 0,
                isEnd = false,
                interval = this.getInterval(),
                eventName = this.getEventName();

            window.setTimeout(function(){
                (function loop() {
                    count += interval;
                    isEnd = me._isEnd(count);
                    if(isEnd){
                        me.dispatchEvent(eventName.END, count);
                    }else{
                        me.dispatchEvent(eventName.TIMEUPDATE, count);
                        window.setTimeout(loop, interval);
                    }
                }());
            }, interval);
        },

        _isEnd: function(total) {
            var res = false;
            if(total >= this.getCountDown()){
                res = true;
            }
            return res;
        }

    });

})();

(function(){
    'use strict';

    /**
     * @class Global.media.video.YouTubeEmbed
     * @extend Global.ObservableClass
     *
     *
     *     var embed = Global.media.video.YouTubeEmbed({
     *         id: 'test',
     *         param: {
     *             videoId: 'M7lc1UVf-VE'
     *         }
     *     });
     *     embed.initSdk();
     */
    Global.define('Global.media.video.YouTubeEmbed',{

        extend: Global.ObservableClass,

        eventName: {
            /**
             * @event loadsdk
             * Fired when youtube sdk is loaded
             * @param {Global.media.video.YouTubeEmbed} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            loadSdk   : 'loadsdk',
            /**
             * @event loadplayer
             * Fired when player is loaded
             * @param {Global.media.video.YouTubeEmbed} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            loadPlayer: 'loadplayer'
        },

        /**
         * @cfg {String} id player id
         */
        id: '',

        /**
         * @cfg {String} sdkId sdk id
         */
        sdkId: 'g-youtube-embed',

        /**
         * @cfg {String} sdkSrc src of sdk
         */
        sdkSrc: 'https://www.youtube.com/iframe_api',

        /**
         * @cfg {Object} inst instance of youtube embed class
         */
        inst: null,

        /**
         * @cfg {Object} param parameter set to embed class
         * @see https://developers.google.com/youtube/iframe_api_reference?hl=ja#Loading_a_Video_Player
         */
        param: null,

        /**
         * @method init
         * @constructor
         */
        init: function(config){
            this._super(config);
        },

        /**
         * @method initsdk
         */
        initSdk: function(){
            if(this._hasSdk()){
                this._onLoadSdk();
                return;
            }
            this._appendSdk();
        },

        /**
         * @method embed
         */
        embed: function(){
            var param = this._getParam(),
                inst = this._createEmbedInstance(param);
            this.inst = inst;
        },

        /**
         * @method _appendSdk
         * @private
         */
        _appendSdk: function(){
            window.onYouTubeIframeAPIReady = Global.Functions.bind(this._onLoadSdk, this);
            var $script = this._getSdkCode();
            $(document.body).append($script);
        },

        /**
         * @method _onLoadSdk
         * @private
         */
        _onLoadSdk: function(){
            this.dispatchEvent(this.getEventName().loadSdk, {currentTarget: this});
            this.embed();
        },

        /**
         * @method _hasSdk
         * @private
         */
        _hasSdk: function(){
            var $sdk = $('#' + this.getSdkId());
            return ($sdk.length > 0) && window.YT;
        },

        /**
         * @method _getSdkCode
         * @private
         */
        _getSdkCode: function(){
            var $script = $('<script>'),
                id = this.getSdkId(),
                src = this.getSdkSrc();
            $script.prop('id', id);
            $script.prop('src', src);
            return $script;
        },

        /**
         * @method _createEmbedInstance
         * @private
         */
        _createEmbedInstance: function(param){
            return new window.YT.Player(this.getId(), param);
        },

        /**
         * @method _getParam
         */
        _getParam: function(){
            var param = this.getParam(),
                add = {
                    events: {
                        'onReady': Global.Functions.bind(this._onReadyVideo, this)
                    }
                };
            return $.extend(true, {}, param, add);
        },

        /**
         * @method _onReadyVideo
         * @private
         */
        _onReadyVideo: function(/*e*/){
            this.dispatchEvent(this.getEventName().loadPlayer, {currentTarget: this});
            // override as you like
            // event.target.playVideo();
        }

    });
})();

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

(function(){
    'use strict';

    /**
     * @class Global.view.Base
     * base class of view.
     * @extend Global.core.ManipulateDomClass,
     */
    Global.define('Global.view.Base',{

        extend: Global.core.ManipulateDomClass,

        EVENT: {
            /**
             * @event show
             * Fired when modal is showed
             */
            show: 'show',
            /**
             * @event hide
             * Fired when modal is hidden
             */
            hide: 'hide'

        },

        /**
         * @method
         * show modal
         */
        show: function(){
            var $elm = this.get$elm();

            $elm.show();
            this.dispatchEvent(this.EVENT.SHOW);
        },

        /**
         * @method
         * hide modal
         */
        hide: function(){
            var $elm = this.get$elm();

            $elm.hide();
            $elm.remove();
            this.dispatchEvent(this.EVENT.HIDE);
        }

    });
})();

(function(){
    'use strict';

    /**
     * @class Global.view.Modal
     * base modal class of view
     * @extend Global.view.Base
     */
    Global.define('Global.view.Modal',{

        extend: Global.view.Base,

        /**
         * @cfg {Boolean} whether modal is centered or not
         */
        centerd: true,

        /**
         * @cfg {String} css class which is added outer element of modal
         */
        cls: null,

        /**
         * @cfg {Boolean} whether modal is hide when user click background
         */
        hideOnMaskClick: false,

        /**
         * @cfg {String} template of modal's outer
         */
        outerTpl: '<div class="g-modal <%= centerdCls %> <%= cls %>"></div>',
        /**
         * @cfg {String} template of modal mask(background)
         */
        maskTpl: '<div class="g-modal__mask <%= centerdCls %> <%= cls %>"></div>',
        /**
         * @cfg {String} modal inner template
         */
        tpl: [],

        /**
         * @cfg {Object} modal jquery element
         */
        $elm: null,

        compiledOuterTpl: null,
        compiledMaskTpl: null,
        compiledTpl: null,

        /**
         * @constructor
         */
        init: function(config) {
            this._super(config);
            this.compiledOuterTpl = this._getCompiledOuterTpl();
            this.compiledMaskTpl  = this._getCompiledMaskTpl();
            this.compiledTpl = this._getCompiledTpl();
        },

        /**
         * @method
         * show modal
         */
        show: function(config){
            var tplData =this._getTplData(config),
                $elm, $mask, $body;

            if(this.$elm){
                return;
            }

            this._create(tplData);
            this._setElmCaches(this.getRefs());
            this._applyEvents(this.getEvents());

            $elm = this.$elm;
            $mask = this.$mask;
            $body = $(document.body);

            $body.append($elm);
            $body.append($mask);

            $elm.show();
            $mask.show();

            this.dispatchEvent(this.getEventName().show);
        },

        /**
         * @method
         * @private
         */
        _create: function(tplData){
            var compiledOuterTpl = this.getCompiledOuterTpl(),
                compiledMaskTpl = this.getCompiledMaskTpl(),
                compiledTpl = this.getCompiledTpl(),
                outerHtml = compiledOuterTpl(tplData),
                maskHtml = compiledMaskTpl(tplData),
                html = compiledTpl(tplData),
                $elm = $(outerHtml),
                $mask = $(maskHtml);

            $elm.append(html);
            $elm.hide();
            $mask.hide();

            this.$elm = $elm;
            this.$mask = $mask;

            if(this.getHideOnMaskClick()){
                this._bindMaskClickHide($mask);
            }else{
                this._bindMaskClickNone($mask);
            }
        },

        /**
         * @method
         * @private
         */
        _bindMaskClickHide: function($mask){
            var me = this;
            $mask.on('click', function(){
                me.hide();
            });
        },

        /**
         * @method
         * @private
         */
        _bindMaskClickNone: function($mask){
            $mask.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
            });
        },

        /**
         * @method
         * @private
         */
        _getTplData: function(config){
            var modalTplData = this._getModalTplData();
            return $.extend(true, {}, modalTplData, config);
        },

        /**
         * @method
         * hide modal
         */
        hide:function(){
            this.$elm.hide();
            this.$elm.remove();
            this.$mask.hide();
            this.$mask.remove();

            this.$elm = null;
            this.$mask = null;

            this.dispatchEvent(this.getEventName().hide);
        },

        /**
         * @method
         * @private
         */
        _getCompiledOuterTpl: function(){
            return _.template(this.getOuterTpl());
        },

        /**
         * @method
         * @private
         */
        _getCompiledMaskTpl: function(){
            return _.template(this.getMaskTpl());
        },

        /**
         * @method
         * @private
         */
        _getCompiledTpl: function(){
            return _.template(this.getTpl());
        },

        /**
         * @method
         * @private
         */
        _getModalTplData: function(){
            var cls = this.getCls() ? this.getCls() : '',
                centerdCls= this.getCenterd() ? 'g-modal--centerd' : '';
            return {
                'cls'       : cls,
                'centerdCls': centerdCls
            };
        }

    });
})();

(function() {
    'use strict';

    /**
     * @class Global.app.History
     * HTML5 History API utility.
     * if the API dose not supported this class use hash flagment.
     * @extend Global.core.ObservableClass
     */
    Global.define('Global.app.History',{

        extend: Global.core.ObservableClass,

        defaultPathName: '',

        changeHash: false,

        eventName: {
            change: 'change'
        },

        /**
         * @cfg {Boolean} isSupported whether browser spport History API or not
         */
        isSupported: history && !!history.pushState,

        /**
         * @cfg {Object} data
         */
        data: null,

        /**
         * @cfg {String} hashextention /# + ${hashextention}
         */
        hashExtention: '!/',

        /**
         * @method state
         * get state data
         */
        state: function() {
            return this.getData();
        },

        /**
         * @method length
         * get state length
         */
        length: function() {
            return this.isSupported ? history.length : null;
        },

        /**
         * @constructor
         */
        init: function(config) {
            this._super(config);
            this._setUseHash(this.useHash);
            this._bind();
        },

        _setUseHash: function(useHash) {
            if(useHash){
                this.isSupported = false;
            }
        },

        /**
         * @method pushState
         * change url
         * if History API dose not supported use change hash flagment
         */
        pushState: function(path, state, title) {
            var _path,
                dpn = this.getDefaultPathName();
            this.setData(state);
            if(this.isSupported){
                _path = dpn + path;
                history.pushState(state, title, _path);
            }else{
                this.setChangeHash(true);
                location.hash = this._getHashByPathName(path);
            }
        },

        /**
         * @method forward
         * same as history.forward()
         */
        forward: function() {
            history.forward();
        },

        /**
         * @method back
         * same as history.back()
         */
        back: function() {
            history.back();
        },

        /**
         * @method go
         * same as history.go()
         */
        go: function() {
            history.go();
        },

        /**
         * @method getNormalizePath
         * if your browser support history api return pathname from location.pathname
         * if your browser dose not supported history api return pathname from location.hash
         * the return path have slash at first child and dose not have slash at last child.
         */
        getNormalizePath: function() {
            var res;
            if(this.isSupported){
                res = this.getPathName();
            }else{
                res = this.getHash();
            }
            return res;
        },

        /**
         * @method getPathName
         * @return pathname which has slash at first child and excluding default pathname
         */
        getPathName: function() {
            var pathName = location.pathname;
            pathName = pathName.split(this.getDefaultPathName())[1];
            pathName = this._addSlashAtFirst(pathName);
            return this._getNoLastSlashPath(pathName);
        },

        /**
         * @method getHash
         * @return pathname which has slash at first child and excluding hash extention (e.g. !#/)
         */
        getHash: function() {
            var hash = location.hash,
                path = this._changeHashToPathName(hash);
            return this._getNoLastSlashPath(path);
        },

        _changeHashToPathName: function(hash) {
            var prefix = '#' + this.getHashExtention(),
                pathName;
            if(!hash){
                pathName = '/';
            }else{
                pathName = hash.split(prefix)[1];
                pathName = this._addSlashAtFirst(pathName);
            }
            return pathName;
        },

        _getHashByPathName: function(path) {
            var he = this.getHashExtention(),
                res;
            if(path === '/'){
                res = he;
            }else{
                res = he + (this._isFirstSlash(path) ? path.substring(1) : path);
            }
            return res;
        },

        /**
         * @private
         */
        _bind: function() {
            if(this.isSupported){
                window.addEventListener('popstate', Global.Functions.bind(this._onPopState, this));
            }else{
                this._bindHashChange();
            }
        },

        /**
         * @private
         */
        _bindHashChange: function() {
            var me = this,
                key = window.addEventListener ? 'addEventListener' : 'attachEvent';
            window[key]('hashchange', function(e) {
                if(!me.getChangeHash()){
                    me._onPopState(e);
                }
                me.setChangeHash(false);
            });
        },

        /**
         * @private
         */
        _onPopState: function(e) {
            var data = {
                state: this.state(),
                raw : e
            };
            this.dispatchEvent(this.getEventName().change, data);
        },
        _isFirstSlash: function(str) {
            var reg = /^\//;
            return reg.test(str);
        },

        _addSlashAtFirst: function(str) {
            var res;
            if(Global.isUndefined(str)){
                res = undefined;
            }else{
                if(!this._isFirstSlash(str)){
                    str  = '/' + str;
                }
                res = str;
            }
            return str;
        },

        _getNoLastSlashPath: function(path){
            var reg = /\/$/;
            if(path === '/'){
                return path;
            }else{
                return reg.test(path) ? path.slice(0, -1) : path;
            }
        }

    });

})();

(function(){
    'use strict';

    /**
     * @class Global.app.Controller
     * This is base controller.
     * @extend Global.core.ManipulateDomClass
     */
    Global.define('Global.app.Controller',{

        extend: Global.core.ManipulateDomClass,

        /**
         * @method restart
         * if you use HistoryRouter this method is called in second time.
         */
        restart: function() {
        }

    });
})();

(function(){
    'use strict';

    /**
     * @class Global.app.Router
     * Routing logic according to url pathname
     * @extend Global.core.BaseClass
     */
    Global.define('Global.app.Router',{

        /**
         * @cfg {Object} routingpath and controller class
         *
         *     routing: {
         *         '/'    : App.controller.Main,
         *         '/list': App.controller.List
         *     }
         */
        routing: {
        },

        /**
         * @cfg {Object} controllers cache controller instance
         */
        controllers: {
        },


        /**
         * @method start
         * make controller instance according to current pathname
         * start routing.
         */
        start: function() {
            var pathName = location.pathname,
                routing  = this.getRouting(),
                Klass    = this._getController(pathName, routing),
                instance = Klass ? new Klass() : undefined,
                key = this._getNoLastSlashPath(pathName);
            this.controllers[key] = instance;
        },

        /**
         * @method
         * @private
         */
        _getController: function(path, routing){
            var pattern = /\/$/,
                hasLastSlash = pattern.test(path) ? path : path + '/',
                noLastSlash  = this._getNoLastSlashPath(path),
                hasLastSlashClass = routing[hasLastSlash],
                noLastSlashClass = routing[noLastSlash];

            return hasLastSlashClass ? hasLastSlashClass : noLastSlashClass;
        },

        /**
         * @method
         * @private
         */
        _getNoLastSlashPath: function(path){
            var reg = /\/$/;
            return reg.test(path) ? path.slice(0, -1) : path;
        }

    });
})();

(function(){
    'use strict';

    /**
     * @class Global.app.HistoryRouter
     * @extend Global.app.Router
     */
    Global.define('Global.app.HistoryRouter',{

        extend: Global.app.Router,

        historyCtr: null,

        useHash: false,

        defaultPathName: '/',

        init: function(config) {
            var me = this;
            this._super(config);
            this.setHistoryCtr(new Global.app.History({
                useHash: me.getUseHash(),
                defaultPathName: me.getDefaultPathName()
            }));
            this._bind();
        },

        _bind: function() {
            this.getHistoryCtr().addEventListener('change', Global.Functions.bind(this._onChangeState, this));
        },

        _onChangeState: function() {
            var isChangeEvent = true;
            this.start(isChangeEvent);
        },

        /**
         * @override
         * @param {Boolean} isChangeEvent
         */
        start: function(isChangeEvent) {
            var pathName = this.getHistoryCtr().getNormalizePath(),
                res = this._start(pathName, isChangeEvent);
            if(!res){
                this._startDefault();
            }
        },

        _startDefault: function() {
            var pathName = this.getDefaultPathName();
            this.changePage(pathName);
        },

        _start: function(pathName, isChangeEvent) {
            var instance = this._getControllerInstance(pathName);
            if(instance){
                instance.restart();
            }else{
                instance = this._makeController(pathName);
            }
            if(!isChangeEvent && instance){
                this.getHistoryCtr().pushState(pathName);
            }
            return !!instance;
        },

        _getControllerInstance: function(path){
            return this.controllers[path];
        },

        _makeController: function(pathName) {
            var routing  = this.getRouting(),
                Klass    = this._getController(pathName, routing),
                instance = Klass ? new Klass({pathKey: pathName}) : undefined;
            this.controllers[pathName] = instance;
            return instance;
        },

        changePage: function(pathName) {
            this._start(pathName);
        }
    });
})();
