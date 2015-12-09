(function(window) {
	'use strict';

	function View(template) {
		this.template = template;
		this.weatherData = document.querySelector('.weather-data');
		this.cityInput = document.querySelector('.input-city');
		this.btn = document.querySelector('.btn');
	};

	View.prototype.bind = function(event, callback){
		var self = this;

		if (event === 'AcquireWeather') {
			self.btn.addEventListener('click', function() {
				callback(self.cityInput.value);
			});
		}
	};

	View.prototype.render = function(renderCmd, param) {
		var self = this;

		var renderView = {
			showWeather: function() {
				self.cityInput.value = param.city;
				self.weatherData.innerHTML = self.template.show(param);
			}
		};

		renderView[renderCmd]();
	};

	window.app = window.app || {};
	window.app.View = View;

})(window);