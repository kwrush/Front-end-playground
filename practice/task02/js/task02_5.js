(function() {
    var wrap = document.getElementById('wrap'),
        left = wrap.getElementsByClassName('left')[0],
        right = wrap.getElementsByClassName('right')[0],
        item = wrap.getElementsByTagName('li');
    
    
}());

var dragDrop = (function(util) {
    
    return {
        /**
         make the given DOM elements draggable, so assign listener to mousedown event
         @param {object} item block DOM element that can be dragged
        */
        assignDrag: function(items) {
            
            this.items = items
            
            for(var i = 0, len = this.items.length; i < len; i++) {
                util.addEvent(this.item[i], 'mousedown', this.handleMouseDown);
            }
        },
        
        /**
         Listener to mousedown event on the draggable element
         */
        handleMouseDown: function(evt) {
            var target = this;
            
        }, 
        
        startDrag: function(target) {
            
        },
        
        releaseDrag: function() {
        
        },
        
        
        
    };
    
}(_util));