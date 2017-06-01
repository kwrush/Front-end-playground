(function () {
    'use strict'; 

    /**
     * Global namespace
     */
    var MineSweeper = window.MineSweeper = {};

    /**
     * Simple event handler
     */
    var Events = {};

    /**
     * Listen to the specific event of the given object
     * @param obj object to be listened
     * @param eventName name of event to be listened
     * @param callback event callback
     * @param context of callback
     * @return this
     */
    Events.listenTo = function (obj, eventName, callback, context) {
        if (!obj) return this;
        obj._events = obj._events || {};
        if (typeof eventName === 'string') {
            var handler = obj._events[eventName] || (obj._events[eventName] = []);
            var _context = context || this;
            handler.push({

                callback: callback,
                context: _context
            });
        }
        return this;
    }
    
    /**
     * Trigger the specific event
     * @param obj Object triggers event
     * @param event name
     * @param event data sending to the callback
     * @return this
     */
    Events.trigger = function (obj, eventName, eventData) {
        if (!obj._events) return this;

        var _eventData = eventData || {};
        var handlers = obj._events[eventName];
        
        handlers.forEach(function(handler) {
            return trigger(handler, eventData);
        });

        return this;
    }

    var trigger = function(handler, eventData) {
        if (!handler || !handler.callback) return;
        var context = handler.context || this;
        handler.callback.call(context, eventData);
    }

    MineSweeper.Events = Events;

})(window);