(function(window, _u) {
    'use strict';

    
    /** 
     * Template provides various default views
     * @constructor 
     */
    function AppTemplate() {
        this.categoryItemTemplate
        = '<li>'
        +     '<a href="#/" data-title="{{title}}">'
        +         '<i class="fa fa-tasks app-tasks-icon"></i>'
        +         '{{title}}'
        +         '<i class="fa fa-trash-o app-trash-icon"></i>'
        +     '</a>'
        + '</li>';

        this.todoListTemplate
        = '<li>'
        +     '<h3 class="app-tasks-date">{{todo-date}}</h3>'
        +     '<ul class="app-tasks">'
        +         '{{todo-list}}'
        +     '</ul>'
        + '</li>'

        this.todoItemTemplate
        = '<li data-task-status="{{status}}" data-task-id="{{id}}">'
        +     '<a href="#/{{title}}">' 
        +         '{{title}}'
        +         '<i class="fa fa-times"></i>'
        +     '</a>'
        + '</li>';

        this.month = [
            'Jan', 'Feb', 'Mar', 'Apr', 
            'May', 'Jun', 'Jul', 'Aug', 
            'Sep', 'Oct', 'Nov', 'Dec'
        ];
    };

    AppTemplate.prototype.addCategory = function(categoryTitle) {
        var template = this.categoryItemTemplate,
            view = '';

        template = template.replace(/{{title}}/g, categoryTitle);
        view += template;

        return view;
    }

    /**
     * @param {object} one todo list objects, e.g. {
                                                        todoDate: new Date(),
                                                        items: [todo1, todo2]
                                                   }
     */
    AppTemplate.prototype.addTodoList = function(todos) {
        var template = this.todoListTemplate,
            view = '', 
            subView = '';

        var date = todos.todoDate,
            items = todos.items,
            formattedDate = this.month[date.getMonth()] + '-' + date.getDate() + '-' + date.getFullYear();

        // view of todo items inside this todo list
        for (var i = 0, len = items.length; i < len; i++) {
            subView += this.addTodoItem(items[i]);
        }

        template = template.replace('{{todo-date}}', formattedDate);
        template = template.replace('{{todo-list}}', subView);
        view += template;

        return view;
    }

    AppTemplate.prototype.addTodoItem = function(item) {
        var template = this.todoItemTemplate,
            view = '';

        template = template.replace('{{status}}', item.status);
        template = template.replace('{{id}}', item.id);
        template = template.replace(/{{title}}/g, item.title);
        view += template;

        return view;
    }


    window.app = window.app || {};
    window.app.AppTemplate = AppTemplate;

}(window, _util));