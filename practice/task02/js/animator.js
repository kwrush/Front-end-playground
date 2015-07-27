/**
 * Animator 
 * @constructor
 * @param {Object} option
 */
var Animator = function(option) {
    this.applyOption(option);
};


Animator.prototype.applyOption = function(option) {
    this.animate = option.animate || this.defOption.animate;
    this.delay = option.delay || this.defOption.delay;
    this.duration = option.duration || this.defOption.duration;
    
    return this;
};


Animator.prototype.defOption = (function() {
    var def = {
        animate: 'easeInOut',  // animation function 
        delay: 1000/60,              // millisecond, time between animation frames
        duration: 1000,              // millisecond, animation duration
    };
    
    return _util.cloneObject(def);
}());

// trigger animation
Animator.prototype.requestAnimateFrame = 
    (window.requestAnimationFrame && window.requestAnimationFrame.bind(window))             ||    
    (window.webkitRequestAnimationFrame && window.webkitRequestAnimationFrame.bind(window)) ||
    (window.mozRequestAnimationFrame && window.mozRequestAnimationFrame.bind(window))       ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    }
     
// terminate animation
Animator.prototype.cancelAnimateFrame = 
    (window.cancelAnimationFrame && window.cancelAnimationFrame.bind(window))             ||    
    (window.webkitCancelAnimationFrame && window.webkitCancelAnimationFrame.bind(window)) ||
    (window.mozCancelnimationFrame && window.mozCancelAnimationFrame.bind(window))        ||
    function( id ){
        window.clearTimeout(id);
    };


Animator.prototype.getAnimationFcn = function() {
    switch(this.animate) {
        case 'linear':
            return EasingFunctions.linearTween;
        case 'easeInOut':
            return EasingFunctions.easeInOutCubic;
        case 'easeIn':
            return EasingFunctions.easeInCubic;
        case 'easeOut':
            return EasingFunctions.easeOutCubic;
        default:
            return EasingFunctions.easeInOutCubic;
    } 
};

// set the class to be animated
Animator.prototype.startWithTarget = function(target) {
    this.target = target;
};

// set the callback function that would be executed after the animation
Animator.prototype.setFinalClb = function(clb) {
    this.finalClb = clb;
} 

Animator.prototype.start = function() {
    var self = this;
    self.timeStart = new Date();
    self.animationFcn = self.getAnimationFcn();
    
    function animationFrame() {
        var timePassed = new Date - self.timeStart;
        
        if (timePassed > self.duration) {
            
            timePassed = self.duration;
            
            self.moveOneFrame(timePassed);
            self.stop();
        }
        else {
            self.moveOneFrame(timePassed);
            self.rafId = self.requestAnimateFrame(animationFrame);
        }
    }
    
    // init first run
    if (!self.rafId) self.requestAnimateFrame(animationFrame);
};

Animator.prototype.stop = function() {
    if (this.rafId) {
        this.cancelAnimateFrame(this.rafId);
        this.rafId = null;
    }
    
    this.finalClb && this.finalClb.call(this.target);
};

Animator.prototype.moveOneFrame = function(timePassed) {
    this.process(timePassed);
};

// process animation frame
Animator.prototype.process = function(timePassed) {
    if (!this.animationFcn) this.animationFcn = this.getAnimationFcn();
    
    var newVal = this.animationFcn(timePassed, this.startVal, this.changeVal, this.duration);
    this.drawFrame(newVal);
};

// draw each frame based on given value and the implementation of subclass
Animator.prototype.drawFrame = function(newVal) {};

// calculate valuess for switching from lastIndex to nextIndex, speciftied in sub class
Animator.prototype.switchTo = function(nextIndex, lastIndex) {}