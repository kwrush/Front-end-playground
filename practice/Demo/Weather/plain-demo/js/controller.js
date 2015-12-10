(function(window) {
	'use strict';

	function Controller(model, view) {
		var self = this;
		// bad...
		self.header = 'http://api.wunderground.com/api/';
		self.key = 'c9914a3fccc20133';
		self.model = model;
		self.view = view;

		self.view.bind('AcquireWeather', function(city) {
			self.acquireWeather(city);
		});
	}

	Controller.prototype.setView = function(city) {
		var self = this;

		self.model.read(function(city) {
			self.acquireWeather(city);
		});
	};


	Controller.prototype.acquireWeather = function(city) {
		var self = this;

		// Can't get correct info with "Beijing", convert it to "Peking"
		city = city === 'Beijing'? 'Peking' : city;

		var location = city.trim() || self.model.defaultCity;
		var url = self._makeURL(location);

		// make a simple ajax request
		self.xhr = new XMLHttpRequest();

		self.xhr.onload = function() {
			self.handleResponse();
		}
		self.xhr.open('GET', encodeURI(url));
		self.xhr.send();
	};

	Controller.prototype.handleResponse = function() {
		if (!this.xhr) return;

		if (this.xhr.status === 200) {
			this.handleWeatherInfo(this.xhr.responseText);
		}
		else {
			alert('Cannot acquire the weather information...');
		}
	};

	Controller.prototype.handleWeatherInfo = function(responseText) {
		var status = JSON.parse(responseText).current_observation;

		if (!status) {
			alert('Cannot acquire the weather of the entered city...');
			return;
		}

		var data = {};
		data.city = status.display_location.city;
		data.date = this._getDate(status.local_tz_long);
		data.temperature = status.temp_c;
		data.weather = status.weather;

		this.model.save(data);
		this.view.render('showWeather', data);
	};

	Controller.prototype._makeURL = function(city) {
		city = city || this.model.defaultCiy;
		return this.header + this.key + '/conditions/lang/q/' + city.replace(/\s+/, '_') + '.json';
	};

	Controller.prototype._getDate = function(timeZone) {
		var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
					 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 
					 'Nov', 'Dec'];

		var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		var formattedDate = new Date().toLocaleString('en-US', {timeZone: timeZone});
		var date = new Date(formattedDate);

		return month[date.getMonth()] + ' ' + date.getDate() + ', ' + day[date.getDay()];
	};

	window.app = window.app || {};
	window.app.Controller = Controller;

})(window);