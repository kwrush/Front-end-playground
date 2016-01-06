// simple helper
var qs = function(selector) {
    return document.querySelector(selector);
};

var qsa = function(selector) {
    return document.querySelectorAll(selector);
};

var hasClass = function hasClass(elem, className) {

    var classes = elem.className;
    className = className.trim();
    if (!classes) return false;
    
    classes = classes.trim().split(/\s+/);
    for (var i = 0, len = classes.length; i < len; i++) {
        if (classes[i] === className) return true;
    }
    
    return false;
};

var removeClass = function(elem, className) {
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

var addClass = function(elem, className) {

    if (className && !hasClass(elem, className)) {
        elem.className = [elem.className, className].join(' ');
    }
};


// Slider class
var Slider = function() {
    this.slider = qs('#slider');
    this.container = qs('.container');
    this.sheets = qsa('.sheet');
    this.spot = qs('.spot');
    this.spots = qsa('.spot li');
    this.viewBoxes = qsa('.view-box ul');

    this.index = 0;
    this.pre = -1;

    this._count = this.sheets.length;
    this._running = false;

    self = this;

    // scroll the sheets 
    this.slider.addEventListener('wheel', function(event) {
        event = event || window.event;
        event.stopPropagation();

        self.scroll(event.deltaY);

    }, true);

    // callback exexutes once scroll to current sheet completely
    this.container.addEventListener('transitionend', function(event) {
        event = event || window.event;
        event.stopPropagation();

        self.doAfterScroll();

    }, false);

    removeClass(this.viewBoxes[0], 'hide-fade-in');
};


Slider.prototype.scroll = function(delta) {

    if (delta && !this._running) {
        var nextIndex = delta < 0 ? this.getIndex(this.index - 1) : this.getIndex(this.index + 1);
        if (this.index !== nextIndex) {
            this.goTo(nextIndex);
        }
    }
};


Slider.prototype.doAfterScroll = function() {

    this._showCurrSheet()
        ._hidePreSheet()
        ._setActiveSpot();
};


Slider.prototype.getIndex = function(newIndex) {
    if (newIndex < 0) return 0;
    if (newIndex >= this._count) return this._count - 1;

    return newIndex;
};


Slider.prototype.goTo = function(index) {
    this.pre = this.index;
    this.index = index;
    this._scrollToCurrent();
};


Slider.prototype._scrollToCurrent = function() {
    this._running = true;
    this.container.style.top = (this.sheets[0].offsetHeight * this.index * -1) + 'px';
};


Slider.prototype._setActiveSpot = function() {
    var activeSpots = qsa('.spot li.active');

    for (var i = 0, len = activeSpots.length; i < len; i++) {
        removeClass(activeSpots[i], 'active');
    }

    addClass(this.spots[this.index], 'active');

    return this;
};


Slider.prototype._showCurrSheet = function() {
    var self = this;

    var preViewBox = this.viewBoxes[this.pre];

    if (preViewBox) {
        this.viewBoxes[this.pre].removeEventListener('transitionend', self._stop.bind(self), true);
    }

    this.viewBoxes[this.index].addEventListener('transitionend', self._stop.bind(self), true);

    removeClass(this.viewBoxes[this.index], 'hide-fade-in');

    return this;
};


Slider.prototype._hidePreSheet = function() {
    var preViewBox = this.viewBoxes[this.pre];

    if (preViewBox) {
        addClass(this.viewBoxes[this.pre], 'hide-fade-in');
    }

    return this;
};


Slider.prototype._stop = function(event) {
    event = event || window.event;
    //event.stopPropagation();

    this._running = false;
};


window.onload = function() {
    var slider = new Slider();
}