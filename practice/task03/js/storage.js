(function(window, _u) {
	'use strict';

	/**
	 * Use localStorage to store data, may use DB or web DB and AJAX
	 * in the future
	 *
	 * @constructor
	 */
	function Storage(name, callback) {
		callback = callback || function() {};

		this.dbName = name;

		if (!localStorage[name]) {
			var data = {
				todoApp: [
					{
						title: 'Default category-1',
						tasks: []
					},

					{
						title: 'Default category-2',
						tasks: []
					}
				]
			};

			localStorage[name] = JSON.stringify(data);
		}

		callback.call(this, JSON.parse(localStorage[name]));
	};

	// list 
	Storage.prototype.findAll = function(callback) {
		callback = callback || function() {};
		callback.call(this, JSON.parse(localStorage[this.dbName]).todoApp);
	}

	// Export
	window.app = window.app || {};
	window.app.Storage = Storage;

}(window, _util));