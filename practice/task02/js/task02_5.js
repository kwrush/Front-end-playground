var dragDrop = (function(util) {
    
    var dd = {};
    
    return {
        /**
         make the given DOM elements draggable, so assign listener to mousedown event
         @param {object} items block DOM element that can be dragged
        */
        assignDrag: function(items, containers) {
            
            dd.self = this;
            
            dd.items = items;
            dd.containers = containers;
            
            for (var i = 0, len = items.length; i < len; i++) {
                util.addEvent(items[i], 'mousedown', this.handleMouseDown);
            }
        },
        
        handleMouseDown: function(evt) {
            var evt = evt || window.event;
            dd.target = evt.target;
            dd.event = evt;
            
            dd.self.startDrag(evt);
        },
        
        startDrag: function(evt) {
            
            var evt = evt || dd.event;
            
            dd.elStartPos = dd.self.getPosition(dd.target);
            dd.mouseStartPos = {pageX: evt.pageX, pageY: evt.pageY};
            
            dd.offset = {x: dd.elStartPos.x - dd.mouseStartPos.pageX,
                         y: dd.elStartPos.y - dd.mouseStartPos.pageY};
                         
            dd.cloneEl = document.createElement(dd.target.tagName);
            dd.cloneEl.innerHTML = dd.target.innerHTML;
            util.addClass(dd.cloneEl, 'item dragged-item');
            
            // assign mouse move/up listener to global document object
            util.addEvent(document, 'mousemove', dd.self.dragging);
            util.addEvent(document, 'mouseup', dd.self.dragRelease);
            util.addEvent(window, 'blur', dd.self.dragRelease);
        },
        
        dragging: function(evt) {
            var evt = evt || window.event,
                curElPos = {x: evt.pageX + dd.offset.x, 
                            y: evt.pageY + dd.offset.y};
            
            if (document.getElementsByClassName('hidden-item').length === 0) {
                dd.dragTarget = dd.cloneEl;
                
                util.addClass(dd.target, 'hidden-item');
                
                document.body.appendChild(dd.dragTarget);
            }
        
            dd.self.updateDragPos(dd.dragTarget, curElPos);
            dd.self.updateDragOver(dd.containers, curElPos);
        },
        
        dragRelease: function(evt) {
            util.removeEvent(document, 'mousemove', dd.self.dragging);
            util.removeEvent(document, 'mouseup', dd.self.dragRelease);
            
            var evt = evt || window.event,
                itemPos = {x: evt.pageX + dd.offset.x, 
                           y: evt.pageY + dd.offset.y};
            
            // if dragged target is hanging over one container
            if (dd.dragOverCont) {
                
                var inEl = document.createElement(dd.dragTarget.tagName);
                inEl.innerHTML = dd.dragTarget.innerHTML;
                util.addEvent(inEl, 'mousedown', dd.self.handleMouseDown);
                util.addClass(inEl, 'item hidden-item');
                
                // check if dragged item is over upper or lower side of one static item
                var onTail = true;
                for (var i = 0, iLen = dd.items.length; i < iLen; i++) {
                    if (dd.self.intersect(itemPos.x, itemPos.y, dd.items[i], 'upper')) {
                        dd.dragOverCont.insertBefore(inEl, dd.items[i]);
                        util.removeClass(inEl, 'hidden-item');
                        
                        onTail = false;
                        break;
                    }
                    
                    else if (dd.self.intersect(itemPos.x, itemPos.y, dd.items[i], 'lower')) {
                        dd.dragOverCont.insertBefore(inEl, dd.items[i].nextSibling);
                        util.removeClass(inEl, 'hidden-item');
                        
                        onTail = false;
                        break;
                    }
                }
                
                // if dragged target is in the container but not over any static item,
                // then we append it to the tail of the container
                if (onTail) {
                    dd.dragOverCont.appendChild(inEl);
                    util.removeClass(inEl, 'hidden-item');
                }
                
                // clear 
                if (dd.dragTarget) {
                    document.body.removeChild(dd.dragTarget);
                }
                
                var hItem = document.getElementsByClassName('hidden-item');
                if (hItem.length > 0) {
                    for (var i = 0, len = hItem.length; i < len; i++) {
                        hItem[i].parentNode.removeChild(hItem[i]);
                    }
                }
                
                dd.dragOverCont = null;
                dd.dragTarget = null;
                dd.target = null;
                
            }
            // otherwise move the dragged target to the initial position
            else {
                // move dragged block to the initial position,
                // and then remove it from document.body, eventually
                // display the original block
                if (dd.dragTarget) {
                    util.addClass(dd.dragTarget, 'release-item');
                    dd.dragTarget.style.left = dd.elStartPos.x + 'px';
                    dd.dragTarget.style.top = dd.elStartPos.y + 'px';
                    dd.dragTarget.style.height = '0';
                }

                // remove dragged block and show the hidden original block after 100ms
                // as the css transition lasts 100ms, aiming to give better user experience
                setTimeout(function() {
                    if (document.getElementsByClassName('dragged-item').length > 0) {
                        document.body.removeChild(dd.dragTarget);
                    }

                    dd.target ? util.removeClass(dd.target, 'hidden-item') : dd.target;
                }, 100);
            }

            for (var i = 0, len = dd.containers.length; i < len; i++) {
                util.removeClass(dd.containers[i], 'dragover');
            }
        },
        
        updateDragPos: function(el, newPos) {
            el.style.left = newPos.x + 'px';
            el.style.top = newPos.y + 'px';
        },
        
        updateDragOver: function(conts, itemPos) {
            var len = conts.length;
             
            // remove dragover style
            for (var i = 0; i < len; i++) {
                util.removeClass(conts[i], 'dragover');
            }
            
            dd.dragOverCont = null;
            
            // check if dragged item is over one container
            for (var i = 0; i < len; i++) {
                if (dd.self.intersect(itemPos.x, itemPos.y, conts[i])) {
                    util.addClass(conts[i], 'dragover');
                    dd.dragOverCont = conts[i];
                    break;
                }
            }
        },
        
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
         @param {object} DOM elment
         @return {object} position object {x, y}
        */ 
        getPosition: function(el) {
            for (var lx = 0, ly = 0; 
                 el != null; lx += el.offsetLeft, ly += el.offsetTop, 
                 el = el.offsetParent);
            
            return {x: lx, y: ly};
        }
    }
}(_util));

(function(dd) {
    var wrap = document.getElementById('wrap'),
        left = wrap.getElementsByClassName('left')[0],
        right = wrap.getElementsByClassName('right')[0],
        items = wrap.getElementsByTagName('li');
    
    dd.assignDrag(items, [left, right]);
}(dragDrop));