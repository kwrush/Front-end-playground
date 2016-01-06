// simple helper
qs = function(selector) {
    return document.querySelector(selector);
};

qsa = function(selector) {
    return document.querySelectorAll(selector);
};

hasClass = function hasClass(elem, className) {
    var classes = elem.className;
    className = className.trim();
    if (!classes) return false;
    
    classes = classes.trim().split(/\s+/);
    for (var i = 0, len = classes.length; i < len; i++) {
        if (classes[i] === className) return true;
    }
    
    return false;
}

removeClass = function(elem, className) {
    if (className && hasClass(elem, className)) {
        className = className.trim();
        var classes = elem.className.trim().split(/\s+/);
        
        for (var i = 0, len = classes.length; i < len; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        
        elem.className = classes.join(' ');
    }
};

addClass = function(elem, className) {
    if (className && !hasClass(elem, className)) {
        elem.className = [elem.className, className].join(' ');
    }
}

window.onload = function() {
    var slider = qs('#slider');
    var container = qs('.container');
    var sheets = qsa('.sheet');
    var spot = qs('.spot');
    var spots = qsa('.spot li');
    var index = 0;
    var count = sheets.length;
    var scrolling = false;

    goTo = function(newIndex) {
        index = newIndex;
        scrolling = true;
        container.style.top = (sheets[0].offsetHeight * newIndex * -1) + 'px';
    };

    getIndex = function(newIndex) {
        if (newIndex < 0) return 0;
        if (newIndex >= count) return count - 1;
        return newIndex;
    };

    slider.addEventListener('wheel', function(event) {
        event = event || window.event;
      
        if (!scrolling) {
            var deltaY = event.deltaY;
            var nextIndex = deltaY < 0 ? getIndex(index - 1) : getIndex(index + 1);
            if (index !== nextIndex) {
                goTo(nextIndex);
            }
        }
    }, false);

    container.addEventListener('transitionend', function(event) {
        scrolling = false;
        for (var i = 0, len = spots.length; i < len; i++) {
            removeClass(spots[i], 'active');
        }
        addClass(spots[index], 'active');
    }, false);
}