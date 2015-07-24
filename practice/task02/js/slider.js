/**
 * Slider 
 * @constructor
 * @param {Object} options for setting up slider
 */
var Slider = function(option) {
    this.applyOption(option);
    
    // outer wrap of all slider components
    this.wrap = document.getElementById(this.wrapId);
    
    if (!this.wrap) {
        throw 'Cannot find such element.';
        return;
    }        
    
    // slider, normally a <UL>
    this.imgGroup = this.wrap.getElementsByClassName(this.sliderClass)[0];
    // image items, normally a <LI>
    this.imgItems = this.imgGroup.getElementsByClassName(this.itemClass);
    
    // image count
    this.count = this.imgItems.length;
    // width of one image
    this.imgWidth = this.imgItems[0].clientWidth;
    
    // init currently displayed image index
    this.index = this.dir === 'normal' ? 0 : imgItems.length - 1; 
    
    // create indicator at the bottom of the slider
    if (this.showInd) {
        var div = document.createElement('div');
        div.className = this.sliderClass + '-' + 'indicator';
        for (var i = 0, len = this.imgItems.length; i < len; i++) {
            var iEl = document.createElement('i');
            iEl.setAttribute('image-ind', i);
            div.appendChild(iEl);
        }
        
        this.wrap.appendChild(div);
        this.currentHightlightIndicator(div);
    }
};

Slider.prototype.applyOption = function(option) {
    this.wrapId = option.wrapId || this.defOption.wrapId;
    this.sliderClass = option.sliderClass || this.defOption.sliderClass;
    this.itemClass = option.itemClass || this.defOption.itemClass;
    this.showInd = option.indClass || this.defOption.showInd;
    this.indShape = option.indShape || this.defOption.indShape;
    this.dir = option.dir || this.defOption.dir;
    this.animate = option.animate || this.defOption.animate;
    this.loop = option.loop || this.defOption.loop;
    this.delay = option.delay || this.defOption.delay;
    this.duration = option.duration || this.defOption.duration;
    
    return this;
}

Slider.prototype.defOption = (function() {
    var def = {
        wrapId: 'slider-wrap',      // wrapper 
        sliderClass: 'slider',      // slider <UL>
        itemClass: 'slider-item',   // image wrapper, <LI>
        showInd: true,              // display indicator
        indShape: 'circle',         // indicator shape
        dir: 'normal',              // sliding directoion
        animate: 'easeInOutCubic',  // sliding animation
        loop: false,                // loop sliding
        delay: 30,                  // millisecond, time between animation frames
        duration: 1000,             // millisecond, animation duration
        interval: 2000              // millisecond, time between two slidings
    };
    
    return _util.cloneObject(def);
}());

Slider.prototype.currentHightlightIndicator = function(wrapper) {
    var indItems = wrapper.getElementsByTagName('i');
    
    _util.each(indItems, function(item) {
        _util.removeClass(item, 'show');
    });
    
    _util.addClass(indItems[this.index], 'show');
}