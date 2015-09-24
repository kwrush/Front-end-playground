(function(window, _u) {
	'use strict';


	/**
     * @constructor
	 *	
	 */
	function CategoryListController(model, view) {
		var self = this;
		//self.model = model;
		self.view = view;

		self.view.bind('toggleList', function(item) {
			self.toggleCategoryList(item);
		});
        
        self.view.bind('removeItem', function(item) {
            self.removeCategoryItem(item);
        });

        self.view.bind('addItem', function(item) {
        	self.addCategoryItem(item);
        });
	};

	CategoryListController.prototype.toggleCategoryList = function(item) {
		var self = this;
		self.view.render('toggleList', item);
	};
    
    CategoryListController.prototype.removeCategoryItem = function(item) {
        var self = this;
        self.view.render('removeItem', item);
    };

    CategoryListController.prototype.addCategoryItem = function(item) {
        var self = this;
        self.view.render('addItem', item);
    };

	// Export to window
	window.app = window.app || {};
	window.app.CategoryListController = CategoryListController;

}(window, _util));