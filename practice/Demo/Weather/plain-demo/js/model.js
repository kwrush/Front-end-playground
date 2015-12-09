(function(window) {
	'use strict';

	function Model(name) {
		this.dbName = name || 'weather'; 
		this.defaultCity = 'Netherlands/Arnhem';

		if (!localStorage[this.dbName]) {
			var store = {
				data: {
					city: '',
					date: '',
					temperature: '',
					weather: ''
				}
			};

			localStorage[this.dbName] = JSON.stringify(store);
		}
	};

	Model.prototype.read = function(callback) {

		var store = JSON.parse(localStorage[this.dbName]);
		var city = store.data.city || this.defaultCity;

		callback.call(this, city);
	};

	Model.prototype.save = function(data){
		var info = JSON.parse(localStorage[this.dbName]);
		var weatherData = info.data;

		for (var key in data) {
			weatherData[key] = data[key];
		}

		info.data = weatherData;

		localStorage[this.dbName] = JSON.stringify(info);
	};

	window.app = window.app || {};
	window.app.Model = Model;

})(window);