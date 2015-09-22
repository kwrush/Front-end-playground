/**
 * Model
 */
(function(window) {
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
     */
    function CategoryModel(storage, categoryName) {
        Model.call(this, storage);
        this.categoryName = categoryName || '';
    }
    
    CategoryModel.prototype = Object.create(Model.prototype);
    
    /**
     * Create a new task model instance
     *
     * @constructor
     * @param {object} storage a reference to the client side storage class
     */
    function TaskModel(storage, categoryName, taskName, date) {
        Model.call(this, storage);
        this.categoryName = categoryName || '';
        this.taskName = taskName || '';
        this.date = date || new Date();
    } 
    
    TaskModel.prototype = Object.create(Model.prototype);
     
}(window));