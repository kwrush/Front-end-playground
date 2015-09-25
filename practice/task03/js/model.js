/**
 * Model
 * To do: localStorage
 */
(function(window, _u) {
    'use strict';
    

    
    /**
     * Create a new category model instance
     *
     * @constructor
     * @param {object} storage a reference to the client side storage class
     * @param {string} category name
     */
    function CategoryModel(storage) {
        this.storage = storage;
    };
    /**
     * Creat a category item, if the category title exists, fire
     * controller to control view to make a warning
     * Not check the input argument
     * @param {string} category title
     * @param {function} callback that is fired after we create a model
     */
    CategoryModel.prototype.create = function(title, callback) {
        title = title.trim() || '';
        callback = callback || function() {};

        var newCategoyr = {
            title: title,
            tasks: []
        };

        this.storage.findAll(function(data) {
            this;
        });

        // Get all categorty names in the storage 
        /*var allCategory = this.storage.readAllCategory();

        var allTitles = [];
        for (var i = allCategory.length; i--) {
            allTitles.push(allCategory[i].title);
        }

        // check if the new title exists
        if (allTitles.indexOf(title) >= 0) {
            var msg = 'Cateogy title exists, please choose another one.'    
            this.controller.alert(msg);
        }*/

        this.storage.save(newCategory, callback);
    };

    

    
    /**
     * Create a new task model instance
     *
     * @constructor
     * @param {object} storage a reference to the client side storage class
     * @param {string} category name that the task belongs to
     * @param {string} task name
     * @param {object} deadline of the task 
     * @param {string} detailed contents of the task
     */
    function TaskModel(storage, categoryName, taskName, date, taskContent) {
        Model.call(this, storage);
        this.categoryName = categoryName || '';
        this.taskName = taskName || '';
        this.date = date || new Date();
        this.taskContent = taskContent || '';
    };

    // Export
    window.app = window.app || {};
    window.app.CategoryModel = CategoryModel;

}(window, _util));