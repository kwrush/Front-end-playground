(function(window, _u) {
	'use strict';


	/**
     * Controller in MVC
     *
	 * @param {object} todo model object
	 * @param {object} view object	
	 */
	function AppController(model, view) {
		var self = this;
		self.model = model;
		self.view = view;

		self.view.bind('toggleCategoryList', function(item) {
			self.toggleCategoryList(item);
		});
        
        self.view.bind('removeCategory', function(item) {
            self.removeCategoryItem(item);
        });

        self.view.bind('addCategory', function(item) {
        	self.addCategoryItem(item);
        });

        self.view.bind('addTask', function(item) {
            self.addTaskItem(item);
        });

        self.view.bind('removeTask', function(item) {
            self.removeTodoItem(item);
        });

        self.view.bind('clickOnAll', function(status) {
            if (status.toLowerCase() === 'all') {
                self.showAllTasks();
            }
            else {
                self.filterTaskView('All tasks', status)
            }
        });

        self.view.bind('clickCategoryItem', function(item) {
            if (item.status.toLowerCase() === 'all') {
                self.clickOnCategoryItem(item.category);
            }
            else {
                self.filterTaskView(item.category, item.status)
            }
            
        });
        
        self.view.bind('clickOnFilter', function(item) {
            
            if (item.category === 'All tasks') {
                if (item.status.toLowerCase() === 'all') {
                    self.showAllTasks();
                }
                else {
                    self.filterTaskView(item.category, item.status);
                }
            }
            else {
                if (item.status.toLowerCase() === 'all') {
                    self.clickOnCategoryItem(item.category);
                }
                else {
                    self.filterTaskView(item.category, item.status);
                }
            }
        });
        
        self.view.bind('clickTaskItem', function(item) {
            if (item.category === 'All tasks') {
                self.findTaskById(item.id);
            }
            else {
                self.findTaskByCategoryAndId(item.category, item.id);
            }
        });
	};

    /**
     * Load data and build the inital view, and
     * it would show all todo items
     *
     * @param {string} 'all' | '' |
     */
    AppController.prototype.buildView = function(locationHash) {
        var route = locationHash;
        var page = route || '';

        this.updateAppView(page);

    };

    AppController.prototype.updateAppView = function(currentPage) {
        var self = this;

        if (currentPage === 'all' || currentPage === '') {
            // [categories] is an array of all category objects, and
            // [todos] is an object groups todo objects by their todo date
            self.model.getAll(function(categories, todos) {
                self.view.render('showCategory', categories);
                self.view.render('showTodos', todos);
            });
        }
        else {  
        }
    };
    
    AppController.prototype.showAllTasks = function() {
        var self = this;
        self.model.getAll(function(categories, todos) {
            self.view.render('showTodos', todos);
        });
    };

	AppController.prototype.toggleCategoryList = function(item) {
		var self = this;
		self.view.render('toggleCategoryList', item);
	};
    
    AppController.prototype.removeCategoryItem = function(item) {
        var self = this;

        self.model.removeCategory(item, function(item) {
            self.view.render('removeCategory', item);
            
            // get all todo items, we don't have to render category list 
            // which has been done by the above render command
            self.showAllTasks(item);
        });
    };

    AppController.prototype.removeTodoItem = function(item) {
        var self = this;

        var id = item.id,
            category = item.activeCategory;

        self.model.removeTask(id, category, function(id) {
            self.view.render('removeTodo', id);
        });
    };

    AppController.prototype.addCategoryItem = function(item) {
        var self = this,
            msg = '';

        self.model.createCategory(item.title, function(newItem) {
        	// the argument is undefined if the new category name
        	// already exists
            if (!newItem) {
                msg = 'The category name already exists, please enter another one.';
                self.view.render('alert', msg);
            }
            else if (newItem.title.trim() === '') {
                msg = 'Category name cannot be empty.';
                self.view.render('alert', msg);
            }	
        	else {
        		self.view.render('addCategory', newItem);
        	}
        });
    };
    
    AppController.prototype.findTaskByCategoryAndId = function(category, id) {
        var self = this;
        self.model.getTaskByCategoryAndId(category, id, function(todo) {
            self.view.render('showTodoContent', todo);
        });
    };
    
    AppController.prototype.findTaskById = function(id) {
        var self = this;
        self.model.getTaskById(id, function(todo) {
            self.view.render('showTodoContent', todo);
        });
    };

    AppController.prototype.addTaskItem = function(item) {
        var self = this,
            title = item.title.trim();

        if (title === '') {
            self.view.render('alert', 'The task name cannot be empty.');
            return;
        }

        self.model.createTask(item, function() {
            self.view.render('addTask', item);
        }); 
    };
    
    /**
     * Filter task list view based on user's action   
    */
    AppController.prototype.filterTaskView = function(category, status) {
        var self = this;
        
        if (category === 'All tasks') {
            self.model.getAll(function(categories, todos) {
                self.model.filterTasksByStatus(todos, status, function(todos) {
                    self.view.render('showTodos', todos);
                });
            });
        }
        else {
            self.model.getTasksByCategory(category, function(todos) {
                self.model.filterTasksByStatus(todos, status, function(todos) {
                    self.view.render('showTodos', todos);
                });
            });
        }
    }

    AppController.prototype.clickOnCategoryItem = function(categoryTitle) {
        var self = this;

        self.model.getTasksByCategory(categoryTitle, function(todos) {
            self.view.render('showTodos', todos);
        });
    };

    /*AppController.prototype.alert = function(msg) {
    	var self = this;
    	self.view.render('alert', msg);
    };*/

	// Export to window
	window.app = window.app || {};
	window.app.AppController = AppController;

}(window, _util));