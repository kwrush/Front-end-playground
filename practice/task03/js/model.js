/**
 * Model
 */
(function(window, _u) {
    'use strict';
    
    
    /**
     * Create a new model instance, 
     * category model and task model inherit from it
     *
     * @constructor
     * @param {object} storage a reference to the client side storage class
     */
    function Model(storage) {
        this.storage = storage;
    };
    
    Model.prototype.read = function(query, callback) {
        
    };
    
    Model.prototype.remove = function(id, callback) {
        
    };
    
    Model.protoype.remeveAll = function(callback) {
        
    };
    
    /**
     * Create a new category model instance
     *
     * @constructor
     * @param {object} storage a reference to the client side storage class
     * @param {string} category name
     */
    function CategoryModel(storage, categoryName) {
        Model.call(this, storage);
        this.categoryName = categoryName || '';
    };

    _u.inherit(CategoryModel, Model);
    

    
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
    
    _u.inherit(TaskModel, Model);
     
}(window, _util));