
'use strict';
/**
 * @class Global.core.Function
 * Wrapper class for Array
 * @extends Global.core.BaseClass
 * @alternateClassName Global.Function
 * @singleton
 */
Global.define('Global.core.Function',{

    alias: 'Global.Function',

    singleton: true,

    /**
     * @method createDebouce
     * make debounce instance
     * @return {Global.util.function.Debounce} debounce instance
     *
     *     // this function is called 1 times 5 seconds.
     *     var config = {
     *             callback: function(value){console.log(value);},
     *             interval: 1000 * 5
     *         },
     *         debounce = Global.core.Function.createDebounce(config);
     *
     *     window.addEventListener('resize', debounce.execute);
     *
     */
    createDebounce: function(config){
        var instance = new Global.util.function.Debounce(config);
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
     *     var callback = Global.core.Function.bind(console.log);
     *     window.addEventListener('resize', callback);
     *
     */
    bind: function(callback, context, args){
        var ary;
        return function(){
            ary = Global.core.Array.args2Array(arguments);
            if(Global.core.Array.isArray(args)){
                ary = ary.concat(args);
            }
            callback.apply(context, ary);
        };
    }

});
