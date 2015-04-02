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
            stackItems[idx].style.zIndex = 10;
            stackItems[idx].className = 'image-stack-item item' + num + ' image-stack0';
            
            var countAf = 0,
                countBe = 0;
            
            for (var m = idx + 1; m < len; m++) {
                if (m + countAf >= len) {
                    stackItems[m].className = 'image-stack-item item' + countBe + ' image-stack' + (num - countBe);
                    countBe++;
                }
                else {
                    countAf++;
                    stackItems[m].className = 'image-stack-item item' + (num + countAf) + ' image-stack' + countAf;
                }
                
            }
            
            countAf = countBe = 0;

            for (var n = idx - 1; n >= 0; n--) {
                if (n - countBe < 0) {
                    stackItems[n].className = 'image-stack-item item' + (num + countBe) + ' image-stack' + countBe;
                } 
                else {
                    countBe++;
                    stackItems[n].className = 'image-stack-item item' + (num - countBe) + ' image-stack' + countBe;
                }
            }
        };
    }

}());