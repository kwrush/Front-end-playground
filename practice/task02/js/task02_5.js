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
            
            dd.offset = {x: evt.clientX - dd.mouseStartPos.pageX,
                         y: evt.clientY - dd.mouseStartPos.pageY};
            
            // assign mouse move/up listener to global document object
            util.addEvent(document, 'mousemove', dd.self.dragging);
            util.addEvent(document, 'mouseup', dd.self.dragRelease);
        },
        
        dragging: function(evt) {
            var evt = evt || window.event,
                curElPos = {x: dd.elStartPos.x + dd.offset.x, 
                            y: dd.elStartPos.y + dd.offset.y};
            
                        
            var cloneEl = document.createElement(dd.target.tagName);
            util.addClass(cloneEl, 'item dragged-item');
            
            dd.oldTarget = dd.target;
            dd.target = cloneEl;
            
            /*dd.target.style.left = curElPos.x + 'px';
            dd.target.style.top = curElPos.y + 'px';*/
            
            console.log(curElPos);
            
            document.body.appendChild(dd.target);
            
            dd.oldTarget.style.height = '0';
            dd.oldTarget.style.opacity = '0';
            dd.oldTarget.style.border = 'none';
            
            dd.self.updateDragPos(dd.target, curElPos);
        },
        
        dragRelease: function(evt) {
            
        },
        
        updateDragPos(el, newPos) {
            el.style.left = newPos.x + 'px';
            el.style.top = newPos.y + 'px';
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
    
    //var dd = {};
    
//    return {
//        /**
//         make the given DOM elements draggable, so assign listener to mousedown event
//         @param {object} item block DOM element that can be dragged
//        */
//        assignDrag: function(items) {
//            
//            dd.items = items;
//            
//            for(var i = 0, len = dd.items.length; i < len; i++) {
//                util.addEvent(dd.items[i], 'mousedown', this.handleMouseDown);
//            }
//        },
//        
//        /**
//         Listener to mousedown event on the draggable element
//         */
//        handleMouseDown: function(evt) {
//            dd.target = evt.target;
//            dragDrop.startDrag();
//        }, 
//        
//        startDrag: function() {
//            dd.startPos = this.getPos(dd.target);
//            dd.startMousePos = {x: window.event.pageX, y: window.event.pageY};
//            dd.offset = {x: dd.startMousePos.x - dd.startPos.x, y: dd.startMousePos.y - dd.startPos.y};
//            
//            util.addEvent(document, 'mousemove', this.dragging);
//            util.addEvent(document, 'mouseup', this.releaseDrag);
//            dd.target.style.opacity = '0.7';
//            dd.target.style.zIndex = '999';
//        },
//        
//        dragging: function(evt) {
//            var evt = evt || window.event,
//                curPos = {x: evt.pageX, y: evt.pageY};
//            
//            dd.target.style.left = curPos.x - dd.startPos.x - dd.offset.x + 'px';
//            dd.target.style.top = curPos.y - dd.startPos.y - dd.offset.y + 'px';
//            
//            console.log(dd.target);
//        },
//        
//        releaseDrag: function() {
//            util.removeEvent(document, 'mousemove', this.dragging);
//        },
//        
//        /**
//         Get the position of the given element relative to the page
//         @param {object} DOM elment
//         @return {object} position object {x, y}
//         */
//        getPos: function(el) {
//            for (var lx = 0, ly = 0; 
//                 el != null; lx += el.offsetLeft, ly += el.offsetTop, 
//                 el = el.offsetParent);
//            
//            return {x: lx, y: ly};
//        }
//        
//    };
    
}(_util));

(function(dd) {
    var wrap = document.getElementById('wrap'),
        left = wrap.getElementsByClassName('left')[0],
        right = wrap.getElementsByClassName('right')[0],
        items = wrap.getElementsByTagName('li');
    
    dd.assignDrag(items)
}(dragDrop));