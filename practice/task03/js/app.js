(function() {
    'use strict';
    
    function ToDo(name) {
    	this.categoryListView = new app.CategoryListView({});
    	this.categoryListController = new app.CategoryListController({}, this.categoryListView);
    };

    var todo = new ToDo('test');

}());