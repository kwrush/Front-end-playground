(function () {
    'use strict';
    
    var imageStack = document.getElementById('image-stack'),
        stackItems = imageStack.getElementsByClassName('image-stack-item'),
        spots      = document.getElementsByClassName('spot');
    
    
    var len = spots.length,
        num = Math.floor(len / 2);
    
    for (var i = 0; i < len; i++) {
        spots[i].addEventListener('mouseover', reorderStack(i), false);
        
    }
    
    function reorderStack(idx) {
        return function() { 
            
            for (var k = 0, len = spots.length; k < len; k++) {
                spots[k].className = 'spot';    
            }
            
            spots[idx].className = spots[idx].className + ' active-spot';

            // first put the current image on top
            stackItems[idx].className = 'image-stack-item item' + num + ' image-stack0';
            
            var change = num - idx;
            
            var countAf = 0,
                countBe = len - num;
            
            // image behind top one
            for (var m = idx + 1; m < len; m++) {
                if (m + change >= len) {
                    countBe--;
                    stackItems[m].className = 'image-stack-item item' + (change - len + m) + ' image-stack' +  countBe;
                }
                else {
                    countAf++;
                    stackItems[m].className = 'image-stack-item item' + (m + change) + ' image-stack' +  countAf;
                }
            }
            
            countAf = 0, countBe = len - num;
            
            // image in front of top one
            for (var n = idx - 1; n >= 0; n--) {
                console.log(n);
                if ( n + change < 0) {
                    countBe--;
                    stackItems[n].className = 'image-stack-item item' + (change + len + n) + ' image-stack' +  countBe;
                }
                else {
                    countAf++;
                    stackItems[n].className = 'image-stack-item item' + (n + change) + ' image-stack' +  countAf;
                }
            }
        };
    }

}());