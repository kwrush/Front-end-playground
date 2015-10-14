/**
 * Model
 * To do: localStorage
 */
(function(window, _u) {
    'use strict';
    
    /**
     * Create a new todo model instance
     *
     * @constructor
     * @param {object} storage a reference to the client side storage class
     * @param {string} category name
     */
    function TodoModel(storage) {
        this.storage = storage;
    };
    /**
     * Creat an empty category item, if the category title exists, fire
     * controller to control view to make a warning
     * Not check the input argument
     * @param {string} category title
     * @param {function} callback that is fired after we create a model
     */
    TodoModel.prototype.createCategory = function(title, callback) {
        title = title.trim() || '';
        callback = callback || function() {};

        var newCategory = {
            title: title,
            tasks: []
        };

        this.storage.saveCategory(newCategory, callback);
    };

    TodoModel.prototype.removeCategory = function(item, callback) {
        callback = callback || function() {};
        this.storage.deleteCategory(item, callback);
    };

    /*
     * Create one todo item
     * @param {object} a todo object contains info of one todo item,
     *                 e.g. {
                                id: random unique number,
                                title: 'Todo-1',
                                category: 'Default category',
                                toDoDate: Date object,
                                initDate: Date object,
                                status: 'active',
                                description: 'This is something to do-4...'
                            }
     * @param {function} callback that is fired after we add a new todo 
     */ 
    TodoModel.prototype.createTask = function(todo, callback) {
        
    };

    TodoModel.prototype.removeTask = function(id, category, callback) {
        callback = callback || function() {};
        
        this.storage.deleteTodo(id, category, callback); 
    };

    /**
     * @param {function} callback is fired after we get all todo items
     */
    TodoModel.prototype.getAll = function(callback) {
        callback = callback || function() {};
        this.storage.findAll(callback);
    };

    TodoModel.prototype.getTasksByCategory = function(category, callback) {
        callback = callback || function() {};
        this.storage.findTodosByCategory(category, callback);
    };
    
    TodoModel.prototype.getTaskByCategoryAndId = function(category, id, callback) {
        callback = callback || function() {};
        this.storage.getTodoByCategorAndId(category, id, callback);
    };
    
    TodoModel.prototype.getTaskById = function(id, callback) {
        callback = callback || function() {};
        this.storage.getTodoById(id, callback);
    };
    
    TodoModel.prototype.filterTasksByStatus = function(todos, status, callback) {
        callback = callback || function() {};
        this.storage.todoFilter(todos, status, callback);
    }

    // Export
    window.app = window.app || {};
    window.app.TodoModel = TodoModel;

}(window, _util));