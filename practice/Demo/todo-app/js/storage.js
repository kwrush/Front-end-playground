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
						title: 'Default category-6',
						tasks: [
							{
								id: new Date().getTime() + 12,
								title: 'Test Todo-66',
								category: 'Default category-6',
								todoDate: new Date(2015, 9, 18, 10, 0, 0),
								createDate: new Date(2015, 9, 17, 10, 31, 21),
								status: 'completed',
								description: 'To do-6...'
							},

							{
								id: new Date().getTime() + 13,
								title: 'Todo6',
								category: 'Default category-6',
								todoDate: new Date(2015, 9, 28, 12, 30, 0),
								createDate: new Date(2015, 9, 25, 11, 13, 27),
								status: 'active',
								description: 'This is something to do-6...'
							}
						]
					}, 

					{
						title: 'Default category-7',
						tasks: [
							{
								id: new Date().getTime() + 14,
								title: 'Todo-7',
								category: 'Default category-7',
								todoDate: new Date(2015, 8, 15, 11, 0, 0),
								createDate: new Date(2015, 9, 10, 10, 31, 21),
								status: 'completed',
								description: 'Something to do-7...'
							},

							{
								id: new Date().getTime() + 15,
								title: 'Test Todo-7',
								category: 'Default category-7',
								todoDate: new Date(2015, 9, 18, 10, 30, 0),
								createDate: new Date(2015, 9, 25, 11, 13, 27),
								status: 'active',
								description: 'This is something to do-7...'
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
     * @param {object} category object, normaly it's a <li> element,   
     * @param {function} callback fired after we delete the category  
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
     * Delete todo from db 
     * @param {string} todo id
     * @param {string} todo category
     * @param {function} callback fired after we delete the todo     
     */
	Storage.prototype.deleteTodo = function(id, category, callback) {
		var data = JSON.parse(localStorage[this.dbName]),
			arr = data.todoApp;

		if (category === 'All tasks') {
			arr = this.deleteTodoById(id, arr);
		}
		else if (category) {
			arr = this.deleteTodoByIdInCategory(id, category, arr);
		}

		data.todoApp = arr;
		localStorage[this.dbName] = JSON.stringify(data);

		callback.call(this, id);
	};


	// delete todo from db by id
	Storage.prototype.deleteTodoById = function(id, dataArr) {
		for (var len = dataArr.length, i = len; i--; ) {
			var tasks = dataArr[i].tasks;

			for (var tLen = tasks.length, j = tLen; j--; ) {
				if (tasks[j].id + '' === id) {
					tasks.splice(j, 1);

					dataArr[i].tasks = tasks;
					return dataArr;
				}
			}
		}
	};

	// delete todo from db by id and its category
	Storage.prototype.deleteTodoByCategoryAndId = function(category, id, dataArr) {
		var data = JSON.parse(localStorage[this.dbName]),
			arr = data.todoApp,
            todoItem;

		for (var len = arr.length, i = len; i--; ) {
			if (arr[i].title === category) {
				var tasks = arr[i].tasks;

				for (var tLen = tasks.length, j = tLen; j--; ) {
					if (tasks[j].id + '' === id) {
						todoItem = tasks[j];
                    	break;
					}
				}
			}
		}

		if (todoItem) {
            callback.call(this, todoItem);
        }
	};
    
    // find todo from db by id
	Storage.prototype.getTodoById = function(id, callback) {
        var data = JSON.parse(localStorage[this.dbName]),
			arr = data.todoApp,
            todoItem;
            
		for (var len = arr.length, i = len; i--; ) {
			var tasks = arr[i].tasks;

			for (var tLen = tasks.length, j = tLen; j--; ) {
				if (tasks[j].id + '' === id) {
					todoItem = tasks[j];
                    break;
				}
			}
		}
        
        if (todoItem) {
            callback.call(this, todoItem);
        }
	};

	// find todo from db by id and its category
	Storage.prototype.getTodoByCategoryAndId = function(category, id, callback) {
		var data = JSON.parse(localStorage[this.dbName]),
			arr = data.todoApp,
            todoItem;
            
        for (var len = arr.length, i = len; i--; ) {
			if (arr[i].title === category) {
				var tasks = arr[i].tasks;

				for (var tLen = tasks.length, j = tLen; j--; ) {
                    if (tasks[j].id + '' === id) {
                        todoItem = tasks[j];
                        break;
                    }
                }
			}
		}
        
        if (todoItem) {
            callback.call(this, todoItem);
        }
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

	/**
	 * Find all todos of the given category
     * @param {string} category name
	 * @param {function} callback fired after we get all
	 */	
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
    
    /** 
     * filter todos by their status
     * @param {object} object contains ordered todos
     * @param {string} status used for filtering
     * @param {function} callback fired after filering
    */
    Storage.prototype.todoFilter = function(todos, status, callback) {
        callback = callback || function() {};
        
        var newTodos = {};
        
        for (var key in todos) {
            var newItems = [];
            var items = todos[key];
            
            for (var len = items.length, i = len; i--; ) {
                if (items[i].status === status.toLowerCase()) {
                    newItems.push(items[i]);
                }
            }
            
            newItems.length ? newTodos[key] = newItems : null;
    	}
        
        callback.call(this, newTodos);
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