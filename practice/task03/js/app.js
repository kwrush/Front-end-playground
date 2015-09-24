(function() {
    'use strict';
    
    function ToDo(name) {
    	this.categoryListTemplate = new app.CategoryListTemplate();
    	this.categoryListView = new app.CategoryListView(this.categoryListTemplate);
    	this.categoryListController = new app.CategoryListController({}, this.categoryListView);
    };

    var todo = new ToDo('test');

}());