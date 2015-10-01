(function(window, _u) {
	'use strict';


	/**
     * Controller in MVC, controling view of category list
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
        
        self.view.bind('clickOnAll', function() {
            self.showAllTasks();
        });

        self.view.bind('clickCategoryItem', function(item) {});
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
    
    AppController.prototype.showAllTasks = function(item) {
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

        this.model.removeCategory(item, function(item) {
            self.view.render('removeCategory', item);
            // get all todo items, we don't have to render category list 
            // which has been done by the above render command
            self.model.getAll(function(categories, todos) {
                self.view.render('showTodos', todos);
            });
        });
    };

    AppController.prototype.addCategoryItem = function(item) {
        var self = this;
        self.model.createCategory(item.title, function(newItem) {
        	// the argument is undefined if the new category name
        	// already exists
            if (!newItem) {
                var msg = 'The category name already exists, please enter another one.';
                self.view.render('alert', msg);
            }
            else if (!newItem.title) {
                var msg = 'Category name cannot be empty.';
                self.view.render('alert', msg);
            }	
        	else {
        		self.view.render('addCategory', newItem);
        	}
        });
    };

    AppController.prototype.alert = function(msg) {
    	var self = this;
    	self.view.render('alert', msg);
    }

	// Export to window
	window.app = window.app || {};
	window.app.AppController = AppController;

}(window, _util));