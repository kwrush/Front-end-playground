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
    
    // utility functions
    window.hasClass = function (element, className) {
        var classNames = element.className;
        
        if (!classNames) return false;
        
        classNames = classNames.split(/\s+/);
        
        for (var i = 0, len = classNames; i < len; i++) {
            if (className === classNames[i]) return true;
        }
        
        return false;
    };
    
    window.addClass = function (element, className) {
        if (!hasClass(element, className)) {
            element.className += className;
        }
        
        return element;
    }
}(window));