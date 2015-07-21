var _util = (function() {
    
    // static array stores all listeners
    var listeners = [];
    
    return {
        /**
         * DOM operations
         */
        
        // a mini selector engine
        $: function(selector) {
            
        },
        
        hasClass: function(element, className) {
            var classNames = element.className;
            
            if (!classNames) return false;
            
            classNames = classNames.split(/\s+/);
            
            for (var i = 0, len = classNames.length; i < len; i++) {
                if (className === classNames[i]) return true;
                
                return false;
            }
        
        },
        
        // add class name
        addClass: function(element, newClassName) {
            if (!_util.hasClass(element, newClassName)) {
                element.className += ' ' + newClassName;
            }
                
            return element;
        },

        // remove class name
        removeClass: function(element, oldClassName) {
            if (!_util.hasClass(element, oldClassName)) {
                var classNames = element.className, 
    
                classNames = _util.uniqArray(classNames.split(/\s+/));
                
                for (var i = 0, len = classNames.length; i < len; i++) {
                    if (classNames[i] === oldClassName) {
                        classNames.splice(i, 1);
                        break;
                    }
                }
                
                element.className = classNames.join(' ');
                
                //reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
                //element.className = element.className.replace(reg, ' ');
            }
                
            return element;
        },
        
        // check is siblingNode and element have the same parent 
        // and the same level under the parent
        isSiblingNode: function(element, siblingNode) {
            // your implement
            for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
                if (node === siblingNode) return true;
            }
            
            return false;
        },
        
        // get the element's position relative to the current viewport
        getPositionViewPort: function(element) {
            return element.getBoundingClientRect();
        },
        
        // get the element's position relative to the entire page
        getPositionDocument: function(element) {
            var pos = {};
            
            pos.x = myElement.getBoundingClientRect().left + window.scrollX;
            pos.y = element.getBoundingClientRect().top + window.scrollY;
            
            return pos;
        },
        
        /**
         * add event listener to the given DOM object for the given event
         * @param {DOM object} element DOM node
         * @param {String} eventType event name
         * @param {Object} listener function that would be excuted once the event is triggered
         * @return {DOM object} given DOM object
         */
        addEvent: function (element, eventType, listener) {
            eventType = eventType.replace(/^on/i, '').toLowerCase();
            
            var self = this;
            
            var realListener = function(e) {
                // NOTE: use 'this.isFunction' here is wrong, 'this' refers to the DOM element
                // binding with the listener
                if (self.isFunction(listener)) {
                    listener.call(element, e);
                }
            }       
        
            if (element.addEventListener) {
                element.addEventListener(eventType, realListener, false);
            }
            
            else if (element.attachEvent) {
                element.attachEvent('on' + eventType, realListener);
            }

            listeners[listeners.length] = [element, eventType, listener, realListener];
            
            return element;
        },
        
        /**
         * remove event listener to the given DOM object for the given event.
         * @param {DOM object} element DOM node
         * @param {String} eventType event name
         * @param {Object} listener function that would be excuted once the event is triggered
         * @return {DOM object} given DOM object
         */
        removeEvent: function(element, eventType, listener) {
            eventType = eventType.replace(/^on/i, '').toLowerCase();
            
            var len = listeners.length;
            
            while(len--) {
                var item = listeners[len],
                    elem = item[0],
                    type = item[1],
                    aListener = item[2],
                    aRealListener = item[3];
                
                // if the given listener is valid, then delete it from listeners
                if (elem === element && type === eventType 
                    && (!listener && listener === aListener)) {
                    
                    if (element.removeEventListener) {
                        element.removeEventListener(eventType, aRealListener, false);
                    }
                    else if (element.detachEvent) {
                        element.detachEvent('on' + eventType, aRealListener);
                    }
                    
                    listeners.splice(len, 1);
                }
                
            }
            
            return element;
        },
        
        // click
        addClickEvent: function(element, listener) {
            if (!listener || !this.isFrozen(listener)) return element;
            
            return this.addEvent(element, 'click', listener);
        },
        
        // press 'Enter' key
        addEnterEvent: function(element, listener) {
            if (!listener || !this.isFrozen(listener)) return element;
        
            return this.addEvent(element, 'keypress', function(e) {
                var event = e || window.event;
                var keyCode = event.which || event.keyCode;
        
                if (keyCode === 13) {
                    listener.call(element, event);
                }
                
            });
        },
        
        /**
         * event delegation
         * @param {DOM object} element DOM node delegated
         * @param {String} tag tag name of the DOM object listened
         * @param {String} eventType event name
         * @param {Object} listener function that would be excuted once the event is triggered
         * @return {DOM object} given DOM object
         */
        delegateEvent: function(element, tag, event, listener) {
            this.addEvent(element, event, function(e) {
                var event = e || window.event;
                var target = event.target || event.srcElement;
                
                if (target && target.tagName === tag.toUpperCase()) {
                    listener.call(target, event);
                }
            });
        }
        
        /**
         * basic methods
         */
        
        call: function(args) {
            return Object.prototype.toString.call(args);
        },
        
        // check whether input is an array, return true or false
        isArray: function(arr) {
            return this.call(arr) === '[object Array]';
        },

        // check whether input is an string
        isString: function(str) {
            return this.call(str) === '[object String]';
        },

        // check whether input is a function
        isFunction: function(fcn) {
            return this.call(fcn) === '[object Function]';
        },
        
        // chech whether input is an object literal
        isPlainObject: function(obj) {
            
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                key;
            
            if (!obj || this.call(obj) !== '[object Object]' || !('isPrototypeOf' in obj)) {
                
                return false;
            }
            
            if ( obj.constructor &&
                !hasOwnProperty.call(obj, "constructor") &&
                !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
                return false;
            }
            
            for (key in obj) {}
            return key === undefined || hasOwnProperty.call( obj, key );
        },

        // deep copy an object, not including function and regexp objects
        cloneObject: function(src) {
            var to = src;
  
            if (src.constructor === Number 
                || src.constructor === String 
                || src.constructor === Boolean) {
				
              return to;
            }
	
            //if (src.constructor !== Object && src.constructor !== Array) return src;
            else if (src.constructor === Date 
			         || src.constructor === RegExp 
					 || src.constructor === Function) {

                return new src.constructor(src);
            }

            to = to || new src.constructor();

            for (var name in src) {
                to[name] = typeof to[name] === 'undefined' ? this.cloneObject(src[name]) : to[name];
            }

            return to;

        },

        // remove duplicate elements in the given array
        uniqArray: function(arr) {

            if (!this.isArray(arr)) return [];

            var map = {},
                out = [];

            for (var i = 0, len = arr.length; i < len; i++) {
                
                if (!map[arr[i]]) {
                    map[arr[i]] = true;
                    out.push(arr[i]);
                }
            }

            return out;
        },
        
        // remove head and tail empty space in an string
        trim: function(str) {
            return str.replace(/(^\s+)|(\s+$)/g, '');
        },
        
        //iterate an array, each element will be used as input arguments
        // to the give function
        each: function(arr, fcn) {
            var i = 0, len = arr.length;
            while(i < len) {
                fcn.call(null, arr[i++]);
            }
        },
        
        eachAlt: function(arr, fcn) {
            var i = 0, len = arr.length;
            while(i < len) {
                fcn(arr[i], i);
                i++;
            }
        },
        
        // get the length of the first layer of the given object
        getObjectLength: function(obj) {
            var size = 0;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            
            return size;
        },
        
        // e.g. xxx@xxx.com or xx-xx@xx-xx.com and so on...
        isEmail: function(email) {
            return /^\w+(\.?\_?\-?\w*)*@\w+(\.?\_?\-?\w*)*\.(com|org|cn|edu|net|io)$/.test(email);
        },
        
        // only for chinese mobile number, such as 13842653321 or 0086/(+86)13923137155
        isMobilePhone: function(phoneNum) {
            return /^((0086|\(\+86\))?)1\d{10}$/.test(phoneNum);
        }
    }
})();


/************ test $ function************/

/************ test event binding function************/
var btn = document.getElementsByTagName('button')[0];
_util.addEvent(btn, 'click', function(e) {
    target = e.target || e.srcElement;
    alert('blabla');
}, false);

/************ basic tool test ************/
/*var a = [1, 2, 4, 5];
function fcn() {}
console.log(_util.isFunction(fcn));
console.log(_util.isArray(a));*/

/*var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = _util.cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

console.log(_util.cloneObject(1)); *///1...

//console.log(_util.uniqArray([1, 2, '1', 'a', 'b', 'b', 3]));

/*console.log(_util.trim('    Sthrhtc gggret ggdg  '));
console.log(_util.trim('  hi!! '));*/

/*var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
_util.each(arr, output);*/  // java, c, php, html

/*var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
_util.eachAlt(arr, output);*/  // java, c, php, html

/*var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(_util.getObjectLength(obj));*/

/*console.log(_util.isEmail('k.ehw@ee-eee.com'));
console.log(_util.isEmail('khh-ehw09988@ee-eee898.com'));
console.log(_util.isEmail('k998.ehw@abc.cn'));
console.log(_util.isEmail('-hw@abc.cn'));

console.log(_util.isMobilePhone('13842179545'));
console.log(_util.isMobilePhone('008613842179545'));
console.log(_util.isMobilePhone('(+86)13842179545'));*/

/*********** DOM operation test *************/
/*
var div = document.getElementsByTagName('div')[0];
_util.addClass(div, 'bb2');
console.log(div.className);

_util.removeClass(div, 'bb2');
console.log(div.className);
*/
/*
var elem = document.getElementsByTagName('p')[0];
var sib = document.getElementsByTagName('table')[0];

console.log(_util.isSiblingNode(elem, sib));*/