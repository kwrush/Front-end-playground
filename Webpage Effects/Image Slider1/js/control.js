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
        move = null,
        now = 0;

    
    /*
        init
    */
    for (var i = 0, wrpLen = imageItemWrps.length; i < wrpLen; i++) {
        // mouseover: display "start game" button
        // NOTE: use closure to keep actual btn object for each event listener
        imageItemWrps[i].addEventListener('mouseover', function(btn) {
            return function() {
                btn.style.display = 'block';
            };
        }(startBtns[i]), false);
        
        // mouseout: hide "start game" button
        imageItemWrps[i].addEventListener('mouseout', function(btn) {
            return function() {
                btn.style.display = 'none';  
            };
        }(startBtns[i]), false);
        
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
        var marginLeft = getMarginLeft(imageItemList);
        console.log(marginLeft);
        if (marginLeft <= -780) {
            moveImage(imageItemList, 780);
        }
        else {
            moveImage(imageItemList, -780 * 2);
        }
    }
    
    rightArrow.addEventListener('click', rightArrow.onclick, false);
    
    rightArrow.onclick = function() {
        var marginLeft = getMarginLeft(imageItemList);
        console.log(marginLeft);
        if (marginLeft >= -780) {
            moveImage(imageItemList, -780);
        }
        else {
            moveImage(imageItemList, 780 * 2);
        }
            
    }
    
    /*
        auto play and manually play image banner
    */
    function autoPlay() {
        timer = setInterval(playImageBanner, 4 * 1000);
    }
    autoPlay();
    
    function playImageBanner() {
        rightArrow.onclick();
    }
    
    function moveImage(itemObj, val) {
        var marginLeft = getMarginLeft(itemObj);
        var offset = 0;
        clearInterval(move);
        move = setInterval(function() {
            offset += val / 40;
            imageItemList.style.marginLeft = marginLeft + offset + 'px';
            if (Math.abs(offset) >= Math.abs(val)) {
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