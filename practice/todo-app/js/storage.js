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
								id: new Date().getTime() - 1,
								category: 'Default category-1',  
								title: 'Todo-1',
								todoDate: new Date(2015, 8, 30, 17, 30, 0),
								createDate: new Date(2015, 8, 26, 9, 30, 1),
								status: 'completed',
								description: 'This is something to do...'
							},

							{
								id: new Date().getTime() + 1,
								title: 'What Todo-2',
								category: 'Default category-1',
								todoDate: new Date(2015, 9, 18, 15, 30, 0),
								createDate: new Date(2015, 8, 26, 12, 10, 32),
								status: 'active',
								description: 'This is something to do-2...'
							},

							{
								id: new Date().getTime() + 2,
								title: 'Something Todo-3',
								category: 'Default category-1',
								todoDate: new Date(2015, 9, 26, 11, 0, 0),
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
								id: new Date().getTime() + 3,
								title: 'Test Todo-3',
								category: 'Default category-2',
								todoDate: new Date(2015, 9, 18, 10, 0, 0),
								createDate: new Date(2015, 9, 17, 10, 31, 21),
								status: 'completed',
								description: 'This is something to do-3...'
							},

							{
								id: new Date().getTime() + 4,
								title: 'Test Todo-4',
								category: 'Default category-2',
								todoDate: new Date(2015, 9, 28, 12, 30, 0),
								createDate: new Date(2015, 9, 25, 11, 13, 27),
								status: 'active',
								description: 'This is something to do-4...'
							}
						]
					}, 
                    
                    {
						title: 'Default category-3',
						tasks: [
							{
								id: new Date().getTime() + 5,
								title: 'Test Todo-3',
								category: 'Default category-3',
								todoDate: new Date(2015, 10, 18, 10, 0, 0),
								createDate: new Date(2015, 9, 17, 10, 31, 21),
								status: 'completed',
								description: 'This is something to do-3...'
							},

							{
								id: new Date().getTime() + 6,
								title: 'Test Todo-4',
								category: 'Default category-3',
								todoDate: new Date(2015, 9, 28, 12, 30, 0),
								createDate: new Date(2015, 9, 25, 11, 13, 27),
								status: 'active',
								description: 'This is something to do-4...'
							}
						]
					}, 
                    
                    {
						title: 'Default category-4',
						tasks: [
							{
								id: new Date().getTime() + 7,
								title: 'Test Todo-3',
								category: 'Default category-4',
								todoDate: new Date(2015, 11, 18, 10, 0, 0),
								createDate: new Date(2015, 9, 17, 10, 31, 21),
								status: 'completed',
								description: 'This is something to do-3...'
							},

							{
								id: new Date().getTime() + 8,
								title: 'Test Todo-4',
								category: 'Default category-4',
								todoDate: new Date(2015, 10, 28, 17, 30, 0),
								createDate: new Date(2015, 9, 25, 11, 13, 27),
								status: 'active',
								description: 'This is something to do-4...'
							}
						]
					}, 
                    
                    {
						title: 'Default category-5',
						tasks: [
							{
								id: new Date().getTime() + 9,
								category: 'Default category-5',  
								title: 'Todo-1',
								todoDate: new Date(2015, 9, 30, 17, 30, 0),
								createDate: new Date(2015, 8, 26, 9, 30, 1),
								status: 'completed',
								description: 'This is something to do...'
							},

							{
								id: new Date().getTime() + 10,
								title: 'What Todo-2',
								category: 'Default category-5',
								todoDate: new Date(2015, 9, 18, 15, 30, 0),
								createDate: new Date(2015, 8, 26, 12, 10, 32),
								status: 'active',
								description: 'This is something to do-2...'
							},

							{
								id: new Date().getTime() + 11,
								title: 'Something Todo-3',
								category: 'Default category-5',
								todoDate: new Date(2015, 9, 30, 11, 0, 0),
								createDate: new Date(2015, 8, 27, 11, 31, 12),
								status: 'completed',
								description: 'This is something to do-2...'
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
    
    /**
     * Delete category from db 
     * @param {DOM object} category object,      
     */
	Storage.prototype.deleteCategory = function(category, callback) {
		var data = JSON.parse(localStorage[this.dbName]);
		
        var arr = data.todoApp,
            index;
        for (index = arr.length; index--; ) {
            var obj = arr[index];
            if (obj.title === category.title) break;
        }

        if (index >= 0) {
            data.todoApp.splice(index, 1);
            localStorage[this.dbName] = JSON.stringify(data);
        }
        
        callback.call(this, category);
	};

	/**
	 * Find all categories and to do items grouped by its "to do" date
	 * @param {function} callback fired after we get all
	 */
	Storage.prototype.findAll = function(callback) {
		callback = callback || function() {};

		var data = JSON.parse(localStorage[this.dbName]).todoApp;

		// stores all categories 
		var categories = [],
			todos = [];

		for (var i = 0, len = data.length; i < len; i++) {
			categories.push(data[i].title);
			var group = data[i].tasks;

			for (var glen = group.length, j = glen; j--; ) {
				todos.push(group[j]);
			}
		}

		var sortTodos = this.groupTodosByDate(todos);

		callback.call(this, categories, sortTodos);
	};

	Storage.prototype.findTodosByCategory = function(category, callback) {
		callback = callback || function() {};

		var data = JSON.parse(localStorage[this.dbName]).todoApp,
			todos;

		for (var len = data.length, i = len; i--; ) {
			if (data[i].title === category) {
				todos = data[i].tasks;
				break;
			}
		}

		var group = this.groupTodosByDate(todos);

		callback.call(this, group);
	};

	Storage.prototype.findAllCategoryTitles = function() {
		var data = JSON.parse(localStorage[this.dbName]).todoApp;
		var titles = [];
		for (var i = data.length; i--;) {
			titles.push(data[i].title);
		}

		return titles;
	};

	/**
	 * Group todos by their dates and sort todos in descending date
	 * @param {array} array contains todo objects
	 */
	Storage.prototype.groupTodosByDate = function(todos) {
		var sortTodos = {},
			result = {},
			dateKeys;

		// group todo items by their to do date
		for (var len = todos.length, i = len; i--; ) {

			// reset date to the beginning of the date,
			// since we only  group those todos which are
			// belong to the same day
			var date = new Date(todos[i].todoDate);
			date.setHours(0, 0, 0, 0);

			(!!!sortTodos[date]) ? sortTodos[date] = [] : null;

			// so key is the date
		    sortTodos[date].push(todos[i]);
		}

		// get keys for sortTdod
		dateKeys = Object.keys(sortTodos);

		// sort date in descend
		dateKeys.sort(function(a, b) {
			return new Date(b) - new Date(a);
		});

		dateKeys.map(function(val) {
			result[val] = sortTodos[val];
		});

		return result;
	}

	// Export
	window.app = window.app || {};
	window.app.Storage = Storage;

}(window, _util));