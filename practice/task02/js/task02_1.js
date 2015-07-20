/**
 * @file task02_1.js
 * @author Kai
 */

(function() {
 
    
    var btn = document.getElementsByClassName('habbit-btn')[0];
    
    function clickBtn(e) {
        
        var input = document.getElementsByClassName('habbit-input')[0],
            habbits = input.value.toLowerCase(),
            showDiv = document.getElementsByClassName('show')[0];
        
        //remove empty space;
        habbits = habbits.replace(/\s+/g, '');
        
        habbits = _util.uniqArray(habbits.split(','));
        
        // make first letter to uppercase
        var len = habbits.length;
        while(len--) {
            habbits[len] = habbits[len].charAt(0).toUpperCase() + habbits[len].slice(1);
        }
        
        var para = '<p>' + habbits.join(', ') + '</p>';
        
        showDiv.innerHTML = para;
    }
    
    _util.addEvent(btn, 'click', clickBtn);
 
 }());