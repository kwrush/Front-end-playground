(function(window) {
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
}(window));