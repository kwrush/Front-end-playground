(function() {
    'use strict';
    
    function ToDo(name) {
    	this.storage = new app.Storage(name);
    	this.initCategoryList(this.storage);
    };

    ToDo.prototype.initCategoryList = function(storage) {
    	this.categoryModel = new app.CategoryModel(storage);
    	this.categoryListTemplate = new app.CategoryListTemplate();
    	this.categoryListView = new app.CategoryListView(this.categoryListTemplate);
    	this.categoryListController = new app.CategoryListController(this.categoryModel, this.categoryListView);
    };

    var todo = new ToDo('myToDoApp');

}());