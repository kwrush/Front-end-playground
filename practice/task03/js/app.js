(function() {
    'use strict';
    
    function ToDo(name) {
    	this.storage = new app.Storage(name);
    	this.model = new app.TodoModel(this.storage);
    	this.template = new app.AppTemplate();
    	this.view = new app.AppView(this.template);
    	this.controller = new app.AppController(this.model, this.view);
    };

    var todo = new ToDo('myToDoApp');

    function setView(cmd) {
    	todo.controller.buildView(cmd);
    }

    window.onload = function() {
    	setView(document.location.hash);
    }

}());