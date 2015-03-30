(function () {
    'use strict';
    
    var imageItemList = document.getElementById('image-item-list'),
        imageItemWrps = imageItemList.getElementsByTagName('li'),
        imageBanner   = document.getElementById('image-banner'),
        navArrow      = document.getElementById('nav-arrow'),
        leftArrow     = document.getElementById('left-arrow'),
        rightArrow    = document.getElementById('right-arrow'),
        startBtns     = document.getElementsByClassName('start-btn'),
        
        timer = null, 
        move  = null,
        flag  = false; //use to block click event when the images are sliding

    
    /*
        init
    */
    for (var i = 0, wrpLen = imageItemWrps.length; i < wrpLen; i++) {
        
        // mouseover: display "start game" button
        imageItemWrps[i].addEventListener('mouseover', showButton(startBtns[i]), false);
        
        // mouseout: hide "start game" button
        imageItemWrps[i].addEventListener('mouseout', showButton(startBtns[i]), false);
        
    }
    
    // NOTE: use closure to keep actual btn object for each event listener
    function showButton(btn) {
        return function() {
            btn.style.display = btn.style.display === 'block' ? 'none' : 'block';
        };
    }
    
    // NOTE: use closure!!!
    imageBanner.addEventListener('mouseover', function(navArrow) {
        return function() {
            navArrow.style.display = 'block';
            clearInterval(timer);
        };
    }(navArrow), false);
    
    imageBanner.addEventListener('mouseout', function(navArrow) {
        return function() {
            navArrow.style.display = 'none';
            autoPlay();
        };
    }(navArrow), false);
    
    
    /*
        click callbacks for left and right arrow
    */
    leftArrow.addEventListener('click', leftArrow.onclick, false);
    
    leftArrow.onclick = function() {
        if (flag) return;
        
        var marginLeft = getMarginLeft(imageItemList);
        if (marginLeft <= -780) {
            slideImage(imageItemList, 780);
        }
        else {
            slideImage(imageItemList, -780 * 2);
        }
    };
    
    rightArrow.addEventListener('click', rightArrow.onclick, false);
    
    rightArrow.onclick = function() {
        if (flag) return;
        
        var marginLeft = getMarginLeft(imageItemList);
        
        if (marginLeft >= -780) {
            slideImage(imageItemList, -780);
        }
        else {
            slideImage(imageItemList, 780 * 2);
        }
            
    };
    
    /*
        auto play and manually play image banner
    */
    function autoPlay() {
        timer = setInterval(playImageBanner, 1000);
    }
    autoPlay();
    
    function playImageBanner() {
        rightArrow.onclick();
    }
    
    function slideImage(itemObj, val) {
        
        var marginLeft = getMarginLeft(itemObj);
        var offset = 0;
        
        clearInterval(move);
        
        move = setInterval(function() {
            flag = true;
            offset += val / 40;
            imageItemList.style.marginLeft = marginLeft + offset + 'px';
            if (Math.abs(offset) >= Math.abs(val)) {
                flag = false;
                clearInterval(move);
            }
        }, 10);
    }
    
    function getMarginLeft(itemObj) {
        
        var computedStyle = window.getComputedStyle(itemObj);
        var marginLeft = window.parseInt(computedStyle.marginLeft, 10);
        
        return marginLeft;
    }
    
}());