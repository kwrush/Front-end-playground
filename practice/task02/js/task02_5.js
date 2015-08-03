var dragDrop = (function(util) {
    
    var dd = {};
    
    return {
        /**
         make the given DOM elements draggable, so assign listener to mousedown event
         @param {object} items block DOM element that can be dragged
        */
        assignDrag: function(items) {
            
            dd.self = this;
            
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
            util.addClass(dd.cloneEl, 'item dragged-item');
            
            // assign mouse move/up listener to global document object
            util.addEvent(document, 'mousemove', dd.self.dragging);
            util.addEvent(document, 'mouseup', dd.self.dragRelease);
        },
        
        dragging: function(evt) {
            var evt = evt || window.event,
                curElPos = {x: evt.pageX + dd.offset.x, 
                            y: evt.pageY + dd.offset.y};
            
            if (!dd.oldTarget) {
                dd.dragTarget = dd.cloneEl;
                
                util.addClass(dd.target, 'hidden-item');
                
                document.body.appendChild(dd.dragTarget);
            }

            dd.self.updateDragPos(dd.dragTarget, curElPos);
        },
        
        dragRelease: function(evt) {
            util.removeEvent(document, 'mousemove', dd.self.dragging);
            util.removeEvent(document, 'mouseup', dd.self.dragRelease);
            
            if (dd.self.intersect(dd.dragTarget)) {
                
            }
            else {
                // move dragged block to the start position,
                // and then remove it from document.body, eventually
                // display the original block
                if (dd.dragTarget) {
                    util.addClass(dd.dragTarget, 'release-item');
                    dd.dragTarget.style.left = dd.elStartPos.x + 'px';
                    dd.dragTarget.style.top = dd.elStartPos.y + 'px';
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
        },
        
        updateDragPos: function(el, newPos) {
            el.style.left = newPos.x + 'px';
            el.style.top = newPos.y + 'px';
        },
        
        updateDragOver: function() {
            
        },
        
        intersect: function(el) {
            return false;
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
    
    dd.assignDrag(items)
}(dragDrop));