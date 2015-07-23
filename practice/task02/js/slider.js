var slider = (function(util, ease) {
    // default configuration
    var defConfig = {
            dir: 'normal',
            move: 'easeInOutCubic',
            loop: false,
            delay: 30,      // millisecond, time between frames
            duration: 1000, // millisecond, animation duration
            interval: 2000  // millisecond, time between two slidings
        };
    
    var defName = 'slider';
    
    /**
     * function for moving an image based on the given options
     * @param {DOM object} 
     * @param {Object} options    
     */
    var slideImage = function(imgGroup, opts) {
        var start = opts.start,
            end = opts.end,
            delay = opts.delay || defConfig.delay,
            dur = opts.duration || defConfig.duration;
            
        var gap = end - start,
            timeStart = new Date();

        var timer = setInterval(function() {
            var timePassed = new Date() - timeStart;
            var factor = ease.easeInOutCubic(timePassed, start, end-start, dur);
            imgGroup.style.left = parseInt(imgGroup.style.left, 10) + gap * factor;
            
            if (parseInt(imgGroup.style.left, 10) === end) {
                clearInterval(timer);
            }
        }, delay);
            
        /*var timer = setInterval(funtion() {
            var timePassed = new Date() - timeStart;
            var factor = ease.easeInOutCubic(timePassed, start, end-start, dur);
            imgGroup.style.left = parseInt(imgGroup.style.left, 10) + gap * factor;
            
            if (parseInt(imgGroup.style.left, 10) === end) {
                clearInterval(timer);
            }
        }, delay); */
    }
    
    var play = function() {
        
    }
    
    return {
        /**
         * init an image slider based on given config, 
         * if user didn't define a config, the default one would be used.
         * @param {String} class name of the most outter wrapper for the slider
         * @param {Object} config
         */
        initSlide: function(name, config) {
            var name = name || defName,
                config = config || defConfig;
            
            var wrap = document.getElementsByClassName(name)[0];
            
            if (!util.isPlainObject(config) || !wrap) {
                throw 'Invalid config';
                return;
            }
            
            var imgGroup = wrap.getElementsByClassName('img-group')[0],
                imgLis = imgGroup.getElementsByTagName('li'),
                imgSpots = wrap.getElementsByClassName('img-spot')[0],
                spots = imgSpots.getElementsByTagName('li');
            
            // remove 'show' style on all spots
            util.each(spots, function(item) {
                util.removeClass(item, 'show');
            });
            
            // if sliding direction is normal, 
            // show the first image and highlight the first spot,
            // otherwise, show last image and spot.
            if (config.dir === 'normal') {
                imgGroup.style.left = '0';
                resetShow(spots, 0);
            }
            else {
                imgGroup.style.right = '0';
                resetShow(spots, spots.length - 1);
            }
            
            // give index to each spot and image
            util.eachAlt(imgLis, assignIndex);
            util.eachAlt(spots, assignIndex);
            
            util.addEvent(imgGroup, 'mouseenter', function(e){
                console.log('mousein');
            });
            util.addEvent(imgGroup, 'mouseleave', function(e){
                console.log('mouseout');
            });

            util.delegateEvent(imgSpots, 'li', 'click', function(e) {
                var show = wrap.getElementsByClassName('show')[0];
                var steps = show.index - this.index;
                
                var startPos = parseInt(imgGroup.style.left);
                
                steps = config.loop ? step - 1 : steps;
                
                var endPos = parseInt(imgGroup.style.left) + steps * imgLis[0].clientWidth;
                
                var opts = {
                    start: startPos,
                    end: endPos,
                    duration: config.duration,
                    delay: config.delay
                }
                slideImage(imgGroup, opts);
                
                resetShow(spots, this.index);
            });
            
            function assignIndex(item, index) {
                item.index = index;
            }
            
            function resetShow(spots, index) {
                util.each(spots, function(item) {
                    util.removeClass(item, 'show');
                });
                util.addClass(spots[index], 'show');
            }

        }
    };
     
}(_util, EasingFunctions));

slider.initSlide('img-gallery');
