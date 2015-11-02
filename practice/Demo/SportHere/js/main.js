$(document).ready(function() {

	var $win = $(window);
	var $indicator = $('.indicator');
	var $spots = $('li a', $indicator);
	var $slides = $('.slider li');

	$indicator.on('click', $spots, function (event) {
		event.preventDefault();

		var target = event.target;
		var index = target ? target.dataset.index : undefined;

		if (index) {
			$spots.removeClass('active');
			$slides.removeClass('show');

			$($spots[index]).addClass('active');
			$($slides[index]).addClass('show');
		}
	});

} ()); 