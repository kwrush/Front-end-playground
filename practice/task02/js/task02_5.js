var dragDrop = (function(util) {
    
    var dd = {};
    
    return {
        /**
         make the given DOM elements draggable, so assign listener to mousedown event
         @param {Object} items      block DOM element that can be dragged
         @param {Object} containers DOM elements containing item stacks
        */
        assignDrag: function(items, containers) {
            
            dd.self = this;
            
            dd.items = items;
            dd.containers = containers;
            
            for (var i = 0, len = items.length; i < len; i++) {
                util.addEvent(items[i], 'mousedown', this.handleMouseDown);
            }
        },
        
        /**
         handle movedown event, we can mouse down on the item to drag them
         @param {Object} evt event object
        */
        handleMouseDown: function(evt) {
            var evt = evt || window.event;
            
            // the itme that is clicked
            dd.target = evt.target;
            dd.event = evt;
            
            dd.self.startDrag(evt);
        },
        
        /**
         do initialization for drag&drop after clicking on one item
         @param {Object} evt event object
        */
        startDrag: function(evt) {
            
            var evt = evt || dd.event;
            
            // get position of the clicked itme and mouse position
            dd.elStartPos = dd.self.getPosition(dd.target);
            dd.mouseStartPos = {pageX: evt.pageX, pageY: evt.pageY};
            
            dd.offset = {x: dd.elStartPos.x - dd.mouseStartPos.pageX,
                         y: dd.elStartPos.y - dd.mouseStartPos.pageY};
            
            // make a copy that would be dragged later of the clicked item
            dd.cloneEl = dd.self.copyItem(dd.target, 'item dragged-item');
            
            // assign mouse move/up listener to global document object
            util.addEvent(document, 'mousemove', dd.self.dragging);
            util.addEvent(document, 'mouseup', dd.self.dragRelease);
            
            // listen blur event of window in case mouse is released outside the window
            util.addEvent(window, 'blur', dd.self.dragRelease);
        },
        
        /**
         handle mouse moving event
         @param {Object} evt event object
        */
        dragging: function(evt) {
            var evt = evt || window.event,
                
                // calculate the current position of the dragged item
                curElPos = {x: evt.pageX + dd.offset.x, 
                            y: evt.pageY + dd.offset.y};
            
            if (dd.cloneEl && dd.target) {
                dd.dragTarget = dd.cloneEl;
                
                // hide the clicked original item by assigning a style to it
                util.addClass(dd.target, 'hidden-item');
                
                // append the new created item to the document body
                document.body.appendChild(dd.dragTarget);
                
                // do updating when we're dragging the item
                dd.self.updateDragPos(dd.dragTarget, curElPos);
                dd.self.updateDragOver(dd.containers, curElPos);
            }
            else {
                // clear listener after mouse release
                dd.self.clearListener();
            }
        },
        
        /**
         handle drop action
         @param {Object} evt event object
        */
        dragRelease: function(evt) {
            // clear listener after mouse release
            dd.self.clearListener();
            
            var evt = evt || window.event,
                
                // get the latest position of the dragged item
                itemPos = {x: evt.pageX + dd.offset.x, 
                           y: evt.pageY + dd.offset.y},
                
                // should we append the item on the tail of the item stack
                onTail = true, 
                
                // the element that will be inserted to the container
                inEl,
                
                // position for inserting one item to the container
                newPos;
            
            // if dragged target is hanging over one container
            if (dd.dragOverCont) {
                
                inEl = dd.self.copyItem(dd.dragTarget, 'item hidden-item');
                util.addEvent(inEl, 'mousedown', dd.self.handleMouseDown);
                
                // check if dragged item is over upper or lower side of one static item
                for (var i = 0, iLen = dd.items.length; i < iLen; i++) {
                    if (dd.self.intersect(itemPos.x, itemPos.y, dd.items[i], 'upper')) {
                        dd.dragOverCont.insertBefore(inEl, dd.items[i]);
                        onTail = false;
                        
                        break;
                    }
                    
                    else if (dd.self.intersect(itemPos.x, itemPos.y, dd.items[i], 'lower')) {
                        dd.dragOverCont.insertBefore(inEl, dd.items[i].nextSibling);
                        onTail = false;
                        
                        break;
                    }
                }
                
                // if dragged target is inside the container but not over any static item,
                // then we append it to the tail of the container
                if (onTail) {
                    dd.dragOverCont.appendChild(inEl);
                }
                
                // clear 
                if (dd.dragTarget) {
                    util.addClass(dd.dragTarget, 'release-item');
                    
                    newPos = dd.self.getPosition(inEl)
                    
                    dd.dragTarget.style.left = newPos.x + 'px';
                    dd.dragTarget.style.top = newPos.y + 'px';
                    dd.dragTarget.style.height = '0';
                }

                // remove dragged block and show the hidden original block after 100ms
                // as the css transition lasts 100ms, aiming to give better user experience
                setTimeout(function() {
                    document.body.removeChild(dd.dragTarget);
                    dd.dragTarget = null;
                    util.removeClass(inEl, 'hidden-item');
                }, 100);
                
                // remove the original hidden item, as we have moved its copy to another position
                dd.target.parentNode.removeChild(dd.target);
                dd.target = null;
                
            }
            // otherwise, the dragged item is not over any container, move it back to the inital positon
            else {
                // move dragged item to the initial position,
                // and then remove it from document.body, eventually
                // display the original block
                if (dd.dragTarget) {
                    util.addClass(dd.dragTarget, 'release-item');
                    dd.dragTarget.style.left = dd.elStartPos.x + 'px';
                    dd.dragTarget.style.top = dd.elStartPos.y + 'px';
                    dd.dragTarget.style.height = '0';
                }

                // remove dragged item and show the hidden original item after 100ms
                // as the css transition lasts 100ms, aiming to give better user experience
                setTimeout(function() {
                    if (dd.dragTarget) {
                        document.body.removeChild(dd.dragTarget);
                        dd.dragTarget = null;
                    }

                    dd.target ? util.removeClass(dd.target, 'hidden-item') : dd.target;
                    dd.target = null;
                }, 100);
            }
            
            // clear
            for (var i = 0, len = dd.containers.length; i < len; i++) {
                util.removeClass(dd.containers[i], 'dragover');
            }
            
            dd.dragOverCont = null;
        },
        
        /**
         update the position of the given element
         @param {Object} el     DOM element
         @param {Object} newPOs new position which will be assigned to el
        */
        updateDragPos: function(el, newPos) {
            el.style.left = newPos.x + 'px';
            el.style.top = newPos.y + 'px';
        },
        
        /**
         handle movemove event, if we're dragging the item over one container, then
         change the container's style
         @param {Array} conts    containers array
         @param {Object} itemPos position {x, y} of the dragged item
        */
        updateDragOver: function(conts, itemPos) {
            var len = conts.length,
                i;
            
            // clear
            dd.dragOverCont = null;
             
            // remove dragover style from all containers
            for (i = 0; i < len; i++) {
                util.removeClass(conts[i], 'dragover');
            }
            
            // check if dragged item is over one container, assign dragover style
            for (i = 0; i < len; i++) {
                if (dd.self.intersect(itemPos.x, itemPos.y, conts[i])) {
                    util.addClass(conts[i], 'dragover');
                    dd.dragOverCont = conts[i];
                    break;
                }
            }
        },
        
        /**
         check if the element with the position (clientX, clientY) overlaps the given element
         @param {Number} clientX x-position
         @param {Number} clientY y-position
         @param {Object} el      DOM element
         @param {String} opt     options, specify you want to check the element overlaps 
                                 upper or lower side of the other element. If you don't
                                 specify it, it will check both upper and lower side.
                             
         @return {Boolean} overlaps or not
        */
        intersect: function(clientX, clientY, el, opt) {
            var elPos = dd.self.getPosition(el),
                elWidth = el.offsetWidth,
                elHeight = el.offsetHeight;
            
            switch(opt) {
                case 'upper':
                    return ((clientX >= elPos.x && clientX <= elPos.x + elWidth/2) || 
                            (clientX <= elPos.x && clientX >= elPos.x - elWidth/2)) &&
                           (clientY + dd.dragTarget.offsetHeight/2 >= elPos.y && 
                            clientY <= elPos.y);
                    
                case 'lower':
                    return ((clientX >= elPos.x && clientX <= elPos.x + elWidth/2) || 
                            (clientX <= elPos.x && clientX >= elPos.x - elWidth/2)) && 
                           (clientY + dd.dragTarget.offsetHeight/2 <= elPos.y + elHeight &&
                            clientY >= elPos.y);
                    
                default:
                    return ((clientX >= elPos.x && clientX <= elPos.x + elWidth/2) || 
                            (clientX <= elPos.x && clientX >= elPos.x - elWidth/2)) && 
                           ((clientY + dd.dragTarget.offsetHeight/2 >= elPos.y && clientY <= elPos.y) ||
                            (clientY + dd.dragTarget.offsetHeight/2 <= elPos.y + elHeight && clientY >= elPos.y));
            }
        },
        
        /**
         Get the position of the given element relative to the page
         @param {Object} el DOM elment
         @return {Object} position {x, y}
        */ 
        getPosition: function(el) {
            for (var lx = 0, ly = 0; 
                 el != null; lx += el.offsetLeft, ly += el.offsetTop, 
                 el = el.offsetParent);
            
            return {x: lx, y: ly};
        },
        
        /**
         Make a copy of the given element and give it a classname if it's defined
         @param {Object} el        DOM elment
         @param {Sting} className class name
         @return copyEl copied DOM element
        */
        copyItem: function(el, className) {
            
            var copyEl = document.createElement(el.tagName);
            copyEl.innerText = el.innerText;
            
            if (className) util.addClass(copyEl, className);
            
            return copyEl;
        },
        
        clearListener: function() {
            // clear listener after mouse release
            util.removeEvent(document, 'mousemove', dd.self.dragging);
            util.removeEvent(document, 'mouseup', dd.self.dragRelease);
        }
    }
}(_util));


(function(dd) {
    var wrap = document.getElementById('wrap'),
        conts = wrap.getElementsByClassName('container'),
        items = wrap.getElementsByTagName('li');
    
    dd.assignDrag(items, conts);
}(dragDrop));