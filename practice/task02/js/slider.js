/**
 * Slider 
 * require util.js and ease.js
 * @constructor
 * @param {Object} options for setting up slider
 */
var Slider = function (option) {
    this.applyOption(option);
    
    this.animator = new SlideEffect({
        animate: this.animate,
        delay: this.delay,
        duration: this.duration
    });
    
    // outer wrap of all slider components
    this.wrap = document.getElementById(this.wrapId);
    
    if (!this.wrap) {
        throw 'Cannot find such element.';
    }        
    
    // slider, normally a <UL>
    this.imgGroup = this.wrap.getElementsByClassName(this.sliderClass)[0];
    // image items, normally a <LI>
    this.imgItems = this.imgGroup.getElementsByClassName(this.itemClass);
    
    // image count
    this.count = this.imgItems.length;
    // width of one image
    this.imgWidth = this.imgItems[0].clientWidth;
    
    this.imgGroup.style.left = '0';
    
    // init currently displayed image index
    this.index = 0; 
    
    // create indicator at the bottom of the slider
    if (this.showInd) this.initInidcator();
    
    // mousein, pause sliding, mouseout, restart sliding
    this.initMouseEnterBehavior();
    this.initMouseLeaveBehavior();
    
    this.autoPlay();
};

// init indicator
Slider.prototype.initInidcator = function() {
    
    var div = document.createElement('div');
    
    div.className = this.getIndicatorClass();
    
    for (var i = 0, len = this.imgItems.length; i < len; i++) {
        var iEl = document.createElement('i');
        iEl.setAttribute('image-ind', i);
        div.appendChild(iEl);
    }

    this.wrap.appendChild(div);
    this.currentHightlightIndicator();

    var self = this;
    
    // click
    _util.delegateEvent(div, 'i', 'click', function() {
        var index = parseInt(this.getAttribute('image-ind'), 10);
        self.goTo(index);
    });

    // mouse in, stop auto play
    _util.delegateEvent(div, 'i', 'mouseeneter', function() {
        self.clearPlayTimer();
    });
    
    // mosue leave, restart auto play
    _util.delegateEvent(div, 'i', 'mouseleave', function() {
        self.autoPlay();
    });
    
};


Slider.prototype.initMouseEnterBehavior = function(fcn) {
    _util.delegateEvent(this.imgGroup, this.imgItems[0].tagName, 'mouseenter', function(evt) {
        self.clearPlayTimer();
    });
};


Slider.prototype.initMouseLeaveBehavior = function(fcn) {
    _util.delegateEvent(this.imgGroup, this.imgItems[0].tagName, 'mouseleave', function(evt) {
        self.autoPlay();
    });
};


// apply the given option
Slider.prototype.applyOption = function(option) {
    this.wrapId = option.wrapId || this.defOption.wrapId;
    this.sliderClass = option.sliderClass || this.defOption.sliderClass;
    this.itemClass = option.itemClass || this.defOption.itemClass;
    this.showInd = option.indClass || this.defOption.showInd;
    this.indShape = option.indShape || this.defOption.indShape;
    this.animate = option.animate || this.defOption.animate;
    this.efftec = option.effect || this.defOption.effect;
    this.loop = option.loop || this.defOption.loop;
    this.delay = option.delay || this.defOption.delay;
    this.duration = option.duration || this.defOption.duration,
    this.interval = option.interval || this.defOption.interval;
    
    return this;
};

// default option for slider
Slider.prototype.defOption = (function() {
    var def = {
        wrapId: 'slider-wrap',      // wrapper 
        sliderClass: 'slider',      // slider <UL>
        itemClass: 'slider-item',   // image wrapper, <LI>
        showInd: true,              // display indicator
        indShape: 'circle',         // indicator shape
        animate: 'easeInOut',       // sliding animation
        effect: 'horizontalSlide',  // slider effect
        loop: true,                // loop sliding
        delay: 1000/60,             // millisecond, time between animation frames
        duration: 1000,             // millisecond, animation duration
        interval: 4000              // millisecond, time between two slidings
    };
    
    return _util.cloneObject(def);
}());

// get indicator wrapper class name
Slider.prototype.getIndicatorClass = function() {
    if (this.showInd) {
        return this.sliderClass + '-' + 'indicator';
    }
    
    return undefined;
};

// get the index that would be reached
Slider.prototype.getIndex = function(index) {
    if (this.index === index) {
        return -1;
    }
    else if (index >= this.count) {
        index = this.loop ? 0 : this.count - 2;
        this.goPre = this.loop ? false : true;
        this.goNext = false;
    }
    else if (index < 0) {
        index = this.loop ? this.count - 1 : 1;
        this.goNext = this.loop ? true : false;
        this.goPre = false;
    }
    
    return index;
};
        
// go to previous image
Slider.prototype.pre = function() {
    this.goTo(this.index - 1);
    return this; 
};

// go to next image        
Slider.prototype.next = function() {
    this.goTo(this.index + 1);
    return this;
};

Slider.prototype.switch = function() {
    if (!(this.goNext || this.goPre)) {
        this.next();
    }
    else if (this.goNext) {
        this.next();
    }
    else if (this.goPre) {
        this.pre();
    }
}

// go to the image with the given index
Slider.prototype.goTo = function(index) {
    var index = this.getIndex(index);
    
    if (index === -1) return;
    
    this.lastIndex = this.index;
    this.index = index;
    
    this.slide(this.lastIndex, this.index);
    
    return this;
};

// slide from lastIndex image to nextIndex image 
Slider.prototype.slide = function(lastIndex, nextIndex) {
    
    var steps = lastIndex - nextIndex;
    
    this.fromVal = parseInt(this.imgGroup.style.left, 10),
    this.toVal = this.fromVal + steps * this.imgItems[0].clientWidth;
    
    this.animator.startWithTarget(this);
    this.animator.setFinalClb(this.currentHightlightIndicator);
    this.animator.start();
};

// start auto slide image
Slider.prototype.autoPlay = function() {
    this.clearPlayTimer();
    this.playTimer = window.setInterval(this.switch.bind(this), this.interval + this.duration);
};

// pause auto play
Slider.prototype.clearPlayTimer = function() {
    window.clearTimeout(this.playTimer);
    this.playTimer = null;
};


// highlight the indicator associate with the currently displayed image 
Slider.prototype.currentHightlightIndicator = function() {
    var wrapper = this.wrap.getElementsByClassName(this.getIndicatorClass())[0],
        indItems = wrapper.getElementsByTagName('i');
    
    _util.each(indItems, function(item) {
        _util.removeClass(item, 'show');
    });
    
    _util.addClass(indItems[this.index], 'show');
};

/**
 * SlideEffect
 * inherit from Animator
 * @constructor
 * @param {Object} options for setting up slider
 */
var SlideEffect = function(option) {
    Animator.call(this, option);
};

SlideEffect.prototype = Object.create(Animator.prototype);

// perform sliding 
SlideEffect.prototype.drawFrame = function(newVal) {
    this.target.imgGroup.style.left = newVal + 'px';
};