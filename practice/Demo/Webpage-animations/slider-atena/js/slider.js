var Slider = (function($) {
	'use strict';

	/*
	 * Make slider functioning
	 * @param {plain object} option  
	 * return slider object
	 */
	var slider = function(option) {
		this.index      = 0;
		this.interval   = 2000;
		this.loop       = 1;
		this.elemInFrom = '230px';
		this.elemOutTo  = '-150px';


		$.extend(this, option);

		this.$wraper    = $('.slider-wrapper');
		this.$slider    = $('.slider');
		this.$layer     = $('li', this.$slider);
		this.$indicator = $('.indicator');
		this.$spots     = $('li > a', this.$indicator);
		this.$pre       = $('.pre-arrow');
		this.$next      = $('.next-arrow');
		this.$btn       = $('.btn-container');
		this.$title     = $('.text-container');

		this.count = this.$layer.length;

		var self = this;

		// Callback fired when clicking on nav arrows
		this.$pre.click(function() {
			self.pre();
		});

		this.$next.click(function() {
			self.next();
		});

		this.$indicator.delegate(this.$spots, 'click', function(event) {

			event = event || window.event;
			event.preventDefault();

			var index = $(event.target).data('index');
			
			self.index = index;
			self.showCurrent().highlightSpot();

		});

		this.showCurrent().highlightSpot();
	};

	// Show current visible slide
	slider.prototype.showCurrent = function() {

		var self = this;

		self.hideTitle();
		self.hideButton();


		self.$layer.not($(self.$layer[self.index]).removeClass('hide'))
		           .each(function() {
		           		$(this).addClass('hide');
		           });
		//$(self.$layer[self.index]).removeClass('hide');

		clearTimeout(this.timer);
		this.timer = null;

		this.timer = setTimeout(function() {
			self.showTitle()
				.showButton();
		}, 2000);

		return self;
	};

	slider.prototype.delay = function(delay) {

		$(this).delay(delay);

		return this;
	};

	slider.prototype.showButton = function() {

		var btn = this.$btn.removeClass('show-btn')[this.index];

		// move button group to the inital position
		$(btn).css({"margin-left": this.elemInFrom});
		
		$(btn).addClass('show')
			  .stop()
			  .animate({ "margin-left": 0 }, 1300, 'easeOutElastic');

		return this;	
	};

	slider.prototype.hideButton = function() {

		var btn = this.$btn[this.lastIndex];

		$(btn).stop()
			  .animate({ "margin-left": this.elemOutTo }, 1000)
		      .removeClass('show');

		return this;
	};

	slider.prototype.showTitle = function() {
		var $mainTitle = $('h2', this.$title[this.index]);
		var $subTitle = $('p', this.$title[this.index]);

		$mainTitle.css({'transform': 'skewX(-90deg)'});
		$subTitle.css({'margin-left': this.elemInFrom});

		$mainTitle.addClass('show')
				  .stop()
				  .animate(
				  	{ 
				  		'transform': 'skewX(0)' 
				  	}, 
				  	{
				  		duration: 1300,
				  		easing: 'easeOutElastic',
				  		step: function(now, tween) {
				  			$(this).css('transform', 'skewX('+ now +'deg)');
				  		}
				  	});
		
		$subTitle.addClass('show')
			     .stop()
			     .animate({ "margin-left": 0 }, 1300, 'easeOutElastic');

		return this;
	};

	slider.prototype.hideTitle = function() {
		var $mainTitle = $('h2', this.$title[this.lastIndex]);
		var $subTitle = $('p', this.$title[this.lastIndex]);

		$mainTitle.stop()
				  .animate(
				  	{ 'transform': 'skewX(-90deg)' }, 

				  	{
				  		duration: 1000,
				  		step: function(now, tween) {
				  			$(this).css('transform', 'skewX('+ now +'deg)' );
				  		}
				  	})
				  .removeClass('show');

		$subTitle.stop()
			     .animate({ "margin-left": this.elemOutTo }, 1000)
		         .removeClass('show');

		return this;
	};

	slider.prototype.highlightSpot = function() {
		this.$spots.removeClass('active');
		$(this.$spots[this.index]).addClass('active');

		return this;
	};

	// Go to previous slide
	slider.prototype.pre = function() {
		this.switchTo(this.index - 1);
		return this;
	};

	// Go to next slide
	slider.prototype.next = function() {
		this.switchTo(this.index + 1);
		return this;
	};

	// Switch to the slide with the given index
	slider.prototype.switchTo = function(index) {
		index = this.getIndex(index);

		if (index === -1) return;

		this.lastIndex = this.index;
		this.index = index;

		this.showCurrent().highlightSpot();

		return this;

	};

	// Calculate the correct index
	slider.prototype.getIndex = function(index) {
		if (index === this.index) {
			return -1;
		}

		if (index >= this.count) {
			index = this.loop ? 0 : this.count - 1;
		}
		else if (index < 0) {
			index = this.loop ? this.count -1 : 0
		}

		return index;
	}


	return slider;

})(jQuery);