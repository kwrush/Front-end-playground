var EventsHandler = (function () {
    var instance;

    function init () {
        var events = {};

        function _getCallback (element, callback) {
            var aCallback = function (evt) {
                if (typeof callback === 'function') {
                    return callback.call(element, evt);
                }
            };

            return aCallback;
        }

        return {
            delegateMouseClick: function (element, targetClass, callback, rightClick) {
                this.click(element, function (evt) {
                    var event = evt || window.event;
                    var target = event.target || event.srcElement;

                    if (target.classList.contains(targetClass)) {
                        event.preventDefault();
                        callback(target, event);
                    }
                }, rightClick);
            },

            click: function (element, callback, rightClick) {
                callback = _getCallback(element, callback);

                if (rightClick) element.addEventListener('contextmenu', callback, false);
                element.addEventListener('click', callback, false);
                return element;
            },

            onchange: function (element, callback) {
                callback = _getCallback(element, callback);
                element.addEventListener('change', callback, false);
                return element;
            },

            getEvents: function () {
                return events;
            },

            listen: function (eventName, callback, callee) {
                var aCallee = callee || this;
                var aCallback = callback ? callback.bind(aCallee) : {};
                if (!events[eventName]) {
                    events[eventName] = [];
                }
                events[eventName].push(aCallback);
            },

            emit: function (eventName, eventData) {
                var callbacks = events[eventName];
                if (callbacks.length) {
                    callbacks.forEach(function (callback) {
                        callback(eventData);
                    });
                }
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
