$(document).ready(function() {
	'use strict';

	var play = null;

	var $preview = $('.preview');

	/**
	 * Place preview box just above the specific indicator spot 
     * @param {object} || {string} DOM element or jQuery object or css selector string
	 */
	function placePreviewAt(element) {
		var $spot = $(element);
		var spotCenter = $spot.position().left + $spot.outerWidth(true)/2;

		return spotCenter - $preview.outerWidth(true)/2;

		//$preview.css('left', left); 
	}
	$preview.css('left', placePreviewAt('.indicator li:first-child a'));


	/* Toggle visibility of nav arrows */
	$('.container').on('mouseenter', '.slider-wrapper', function() {
		$('.nav-arrow').removeClass('nav-arrow-hide');
	}).on('mouseleave', '.slider-wrapper', function() {
		$('.nav-arrow').addClass('nav-arrow-hide');
	});

	/* Show preview mini images */
	$('.indicator').on('mouseenter', 'li > a', function() {
		var index = $(this).data('index');
		var img = $($('.image-container > img')[index]).attr('src');
		var left = placePreviewAt($(this));

		$preview.css({
			"background-image": "url(" + img + ")"
		}).stop().animate({'left': left});

	});

	$('.indicator').on('mouseenter', 'ul', function() {
		$preview.removeClass('preview-hide');
	}).on('mouseleave', 'ul', function() {
		$preview.addClass('preview-hide');
	});

	// Functioning slider
	var slider = new Slider({});

	/*function autoPlay() {
		play = setTimeout(play(), 3000);
	}
	autoPlay();

	function play() {
		
	}*/
});