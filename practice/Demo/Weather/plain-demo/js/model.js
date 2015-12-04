(function(window) {
	'use strict';

	function Model(name, callback) {
		this.dbName = name || 'weather'; 
		this.defaultCity = 'Arnhem';

		if (!localStorage[this.dbName]) {
			var data = {
				weather: []
			};

			localStorage[this.dbName] = JSON.stringify(data);
		}

		callback.call(this, JSON.parse(localStorage[this.dbName]));
	}

	Model.prototype.create = function(callback) {
		callback = callback || function() {};


	};

	Model.prototype.read = function() {

	};

	Model.prototype.save = function(argument){
		
	};

})(window);