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
				// just create some dummy data
				todoApp: [
					{
						title: 'Default category-1',
						tasks: [
							{
								id: new Date().getTime(),
								category: 'Default category-1',  
								title: 'Todo-1',
								todoDate: new Date(2015, 8, 30, 17, 30, 0),
								createDate: new Date(2015, 8, 26, 9, 30, 1),
								status: 'completed',
								description: 'This is something to do...'
							},

							{
								id: new Date().getTime(),
								title: 'Todo-2',
								category: 'Default category-1',
								todoDate: new Date(2015, 9, 1, 9, 0, 0),
								createDate: new Date(2015, 8, 26, 12, 10, 32),
								status: 'active',
								description: 'This is something to do-2...'
							},

							{
								id: new Date().getTime(),
								title: 'Todo-2',
								category: 'Default category-1',
								todoDate: new Date(2015, 9, 2, 11, 0, 0),
								createDate: new Date(2015, 8, 27, 11, 31, 12),
								status: 'completed',
								description: 'This is something to do-2...'
							}
						]
					},

					{
						title: 'Default category-2',
						tasks: [
							{
								id: new Date().getTime(),
								title: 'Todo-3',
								category: 'Default category-2',
								todoDate: new Date(2015, 9, 18, 10, 0, 0),
								createDate: new Date(2015, 9, 17, 10, 31, 21),
								status: 'completed',
								description: 'This is something to do-3...'
							},

							{
								id: new Date().getTime(),
								title: 'Todo-4',
								category: 'Default category-2',
								todoDate: new Date(2015, 9, 28, 12, 0, 0),
								createDate: new Date(2015, 9, 25, 11, 13, 27),
								status: 'active',
								description: 'This is something to do-4...'
							}
						]
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

        // Convert all titles to upper case
        titles.forEach(function(title, index, allTitles) {
        	allTitles[index] = title.toUpperCase();
        });

        // if the name already exists (ignore case), 
        // or it's empty, ask view to make a alert
        if (newCategory.title === '') {
        	callback.call(this, newCategory);
        }
        else if (titles.indexOf(newCategory.title.toUpperCase()) >= 0) {
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