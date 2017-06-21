export {
    qs, 
    qsa,
    hasClass,
    removeClass,
    addClass,
    clearClass,
    on,
    delegate,
    listenTo,
    fire
}

function qs (selector, context) {
    return (context || document).querySelector(selector);
}

function qsa (selector, context) {
    return (context || document).querySelectorAll(selector);
}

function hasClass (element, className) {
    return !!element && element.classList.contains(className);
}

function addClass (element, className) {
    const names = className.trim().split(/\s+/);
    element && element.classList.add(...names);
}

function removeClass (element, className) {
    element && element.classList.remove(className);
}

function clearClass (element) {
    element && (element.className = '');
}

function on (target, event, callback, useCapture) {
    target.addEventListener(event, _callback(callback, target), !!!useCapture);
}

function delegate (delegator, selector, eventName, callback) {
    let useCapture = eventName === 'blur' || eventName === 'focus';

    on(delegator, eventName, (event) => {
        let target = event.target;
        let potentialTargets = qsa(selector, delegator);
        let hasMatch = Array.prototype.indexOf.call(potentialTargets, target) >= 0

        if (hasMatch) {
            _callback(callback, target)(event);
        }

    }, useCapture);

}

function listenTo (obj, eventName, callback, context) {
    if (!obj) return this;
    obj._events = obj._events || {};
    if (typeof eventName === 'string') {
        let handlers = obj._events[eventName] || (obj._events[eventName] = []);
        context = context || null;
        handlers.push({
            callback: callback,
            context: context
        });
    }
}

function fire (obj, eventName, eventData) {
    if (!obj._events) return this;

    eventData = eventData || {};
    let handlers = obj._events[eventName] || [];
    
    for (let i = 0; i < handlers.length; i++) {
        if (!handlers[i] || !handlers[i].callback) continue;
        let ctx = handlers[i].context || this;
        _callback(handlers[i].callback, ctx)(eventData);
    }
}

function _callback(callback, context) {
    return function (...params) {
        if (typeof callback === 'function') {
            callback.apply(context, params);
        }
    }
}