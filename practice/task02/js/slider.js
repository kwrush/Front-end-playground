/**
 * Slider 
 * @constructor
 * @param {Object} options for setting up slider
 */
var Slider = function(option) {
    this.wrapId = option.wrapId || this.defOption.wrapId;
    this.sliderClass = option.sliderClass || this.defOption.sliderClass;
    this.itemClass = option.itemClass || this.defOption.itemClass;
    this.indClass = option.indClass || this.defOption.indClass;
    this.indItemClass = option.indItemClass || this.defOption.indItemClass;
    this.dir = option.dir || this.defOption.dir;
    this.animate = option.animate || this.defOption.animate;
    this.loop = option.loop || this.defOption.loop;
    this.delay = option.delay || this.defOption.delay;
    this.duration = option.duration || this.defOption.duration;
    
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
    
    //indicator wrapper under the images
    this.indGroup = this.wrap.getElementsByClassName(this.indClass)[0];
    this.indItems = this.indGroup.getElementsByClassName(this.indItemClass);
};

Slider.prototype.defOption = (function() {
    var def = {
        wrapId: 'slider-wrap',
        sliderClass: 'slider',
        itemClass: 'slider-item',
        indClass: 'indicator',
        indItemClass: 'ind-item',
        dir: 'normal',
        animate: 'easeInOutCubic',
        loop: false,
        delay: 30,      // millisecond, time between animation frames
        duration: 1000, // millisecond, animation duration
        interval: 2000  // millisecond, time between two slidings
    };
    
    return _util.cloneObject(def);
}());