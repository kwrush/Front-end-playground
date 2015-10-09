var _util = (function() {
    
    // static array stores all listeners
    var listeners = [];
    
    return {
        /**
         * DOM operations
         */
        
        hasClass: function(element, className) {
            var classNames = element.className;
            
            if (!classNames) return false;
            
            classNames = classNames.split(/\s+/);
            
            for (var i = 0, len = classNames.length; i < len; i++) {
                if (className === classNames[i]) return true;
            }

            return false;
        
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
            if (_util.hasClass(element, oldClassName)) {
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
         * @param {object} element DOM node
         * @param {string} eventType event name
         * @param {object} listener function that would be excuted once the event is triggered
         * @return {object} given DOM object
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
         * @param {object} element DOM node
         * @param {string} eventType event name
         * @param {object} listener function that would be excuted once the event is triggered
         * @return {object} given DOM object
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
                    && (listener && listener === aListener)) {
                    
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
            if (!listener || !this.isFunction(listener)) return element;
        
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
         * @param {object} element DOM node delegated
         * @param {string} tag tag name of the DOM object listened
         * @param {string} eventType event name
         * @param {object} listener function that would be excuted once the event is triggered
         * @return {object} given DOM object
         */
        delegateEvent: function(element, tag, event, listener) {
            this.addEvent(element, event, function(e) {
                var event = e || window.event;
                var target = event.target || event.srcElement;
                
                if (target && target.tagName === tag.toUpperCase()) {
                    listener.call(target, event);
                }
            });
        },
        
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

        // deep copy an object
        cloneObject: function(src) {
            var to = null; 
  
            if (src.constructor === Number 
                || src.constructor === String 
                || src.constructor === Boolean) {
				
              return src;
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
        
        // inherit
        inherit: function(subClass, parentClass) {
            if (parentClass.constructor === Function) { 
                //Normal Inheritance 
                subClass.prototype = new parentClass;
                subClass.prototype.constructor = subClass;
                subClass.prototype.parent = parentClass.prototype;
            } 
            else { 
                //Pure Virtual Inheritance 
                subClass.prototype = parentClass;
                subClass.prototype.constructor = subClass;
                subClass.prototype.parent = parentClass;
            } 
            
            return subClass;
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