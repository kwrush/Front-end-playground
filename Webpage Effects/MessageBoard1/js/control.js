/* get DOM elements by id, class or tagname*/
var getMan = {
    byId: function(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    },
    
    byClass: function(className) {
        return document.getElementsByClassName(className);
    },
    
    byTagName: function(tagName) {
        return typeof tagName === 'string' ? document.getElementsByTagName(tagName) : tagName;
    }
};

/* manipulate css */
var cssMan = {
    
};

/* attach/remove event to objects */
var eventMan = {
    addEvent: function(obj, event, fcn) {
        obj.addEventListener(event, fcn, false);
    },
    
    removeEvent: function(obj, event, fcn) {
        obj.removeEventListener(event, fcn, false);
    }
}

/* main */
// user's msg
var msgItems = getMan.byClass('msg-item');

for (var i = 0, len = msgItems.length; i < len; i++) {
    eventMan.addEvent(msgItems[i], 'mouseover', function(liObj) {
        console.log(liObj);
        liObj.style.backgroundColor = '#dee4ea';
    }(msgItems[i]));
}

function sendFcn() {};