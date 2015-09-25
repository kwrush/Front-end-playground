(function() {
    'use strict';
    
    function ToDo(name) {
    	this.storage = new app.Storage(name);
    	this.categoryModel = new app.CategoryModel(this.storage);
    	this.categoryListTemplate = new app.CategoryListTemplate();
    	this.categoryListView = new app.CategoryListView(this.categoryListTemplate);
    	this.categoryListController = new app.CategoryListController(this.categoryModel, this.categoryListView);
    };

    var todo = new ToDo('myToDoApp');

}());