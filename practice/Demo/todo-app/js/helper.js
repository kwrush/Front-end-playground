(function(window, _u) {
    'use strict';
    
    // short terms of some common functions
    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };
    
    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };
    
    window.gid = function (id, scope) {
        return (scope || document).getElementById(id);
    };
    
    window.gc = function (className, scope) {
        return (scope || document).getElementsByClassName(className);
    };
    
    window.gt = function (tag, scope) {
        return (scope || document).getElementsByTagName(tag);
    };

    window.delegate = function(element, selector, eventType, listener) {
        _u.addEvent(element, eventType, function(e) {
            var evt = e || window.event;
            var target = evt.target || evt.srcElement;

            // get all elememts fit the selector
            var potentialTargets = window.qsa(selector, element);

            // check whether the target is in the potential targets array
            var hashMatch = Array.prototype.indexOf.call(potentialTargets, target) >= 0;

            if (hashMatch) {
                listener.call(target, evt);
            }
        });
    };
}(window, _util));