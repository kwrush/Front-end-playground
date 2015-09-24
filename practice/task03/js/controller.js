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
	};

	CategoryListController.prototype.toggleCategoryList = function(item) {
		var self = this;
		self.view.render('toggleList', item);
	};
    
    CategoryListController.prototype.removeCategoryItem = function(item) {
        var self = this;
        self.view.render('removeItem', item);
    };

	// Export to window
	window.app = window.app || {};
	window.app.CategoryListController = CategoryListController;

}(window, _util));