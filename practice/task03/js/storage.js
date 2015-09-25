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

	Storage.prototype.saveCategory = function(newCategory, callback){
		var data = JSON.parse(localStorage[this.dbName]);

		// Get all categorty names in the storage 
        var titles = this.findAllCategoryTitles();

        // if exists, ask view to make a alert
        if (titles.indexOf(newCategory.title) >= 0) {
            callback.call(this);
        }
        else {
        	data.todoApp.push(newCategory);
			localStorage[this.dbName] = JSON.stringify(data);
			callback.call(this, newCategory);
        }
	};

	// list 
	Storage.prototype.findAll = function(callback) {
		callback = callback || function() {};
		callback.call(this, JSON.parse(localStorage[this.dbName]).todoApp);
	}

	Storage.prototype.findAllCategoryTitles = function() {
		var data = JSON.parse(localStorage[this.dbName]).todoApp;
		var titles = [];
		for (var i = data.length; i--;) {
			titles.push(data[i].title);
		}

		return titles;
	}

	// Export
	window.app = window.app || {};
	window.app.Storage = Storage;

}(window, _util));