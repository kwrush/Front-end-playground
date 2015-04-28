'use strict';

/* get DOM elements by id, class or tagname*/
var getMan = {
    byId: function(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    },
    
    byClass: function(className) {
        return typeof className === 'string' ? document.getElementsByClassName(className) : className;
    },
    
    byTagName: function(tagName) {
        return typeof tagName === 'string' ? document.getElementsByTagName(tagName) : tagName;
    }
};

/* manipulate css */
var cssMan = {

};

/* main */

// change li background color
var toggleLiBg = function(event) {
    switch (event.type) {
        case 'mouseover':
            this.style.backgroundColor = '#dee4ea';
            
            // for "no message" LI, this.delBtn is undefined
            if (this.delBtn) {
                
                this.delBtn.style.display = 'inline';
                this.delBtn.parentLi = this;
                this.delBtn.addEventListener('click', deleteMsg, false);
            }
            
            break;
        case 'mouseout':
            this.style.backgroundColor = '#fff';
            
            if (this.delBtn) {
                this.delBtn.style.display = 'none';
            }
            
            break;
    }
};

// delete msg when click on delete button
var deleteMsg = function(event) {
    
    var parentUl = this.parentLi.parentElement;
    var pLi = this.parentLi;
    
    timer = setInterval(function() {
        var step = .1;
        //change opaciy
        
        console.log(pLi.style.opacity);
        
        if (pLi.style.opacity <= 0) {
            clearInterval(timer);
            
            timer = setInterval(function() {
                var stepH = 5;
                var cHeight = pLi.clientHeight;
                
                console.log(pLi.clientHeight);
                
                pLi.style.height = cHeight - stepH + 'px';
                
                if (pLi.clientHeight <= 0) {
                    clearInterval(timer);
                }
                
            }, 30)
        }
        
    }, 30);
            
    parentUl.removeChild(this.parentLi);
    
    var lastCh = parentUl.lastElementChild;
    
    // if all message LIs have been deleted
    if (lastCh.classList.contains('empty')) {
        // show this "no message block"
        lastCh.style.display = 'block';
        
        // avoid changing background color of this LI block
        lastCh.removeEventListener('mouseover', toggleLiBg, false);
        lastCh.removeEventListener('mouseout', toggleLiBg, false);
    }    
};

// add a new message
var sendFcn = function() {


};

// user's msg
var msgItems = getMan.byClass('msg-item');
var timer    = null;

for (var i = 0, len = msgItems.length; i < len; i++) {
    var aLi    = msgItems[i];
    var delBtn = aLi.getElementsByClassName('del')[0];
    
    aLi.addEventListener('mouseover', toggleLiBg, false);
    aLi.addEventListener('mouseout', toggleLiBg, false);

    aLi.delBtn = delBtn;
}