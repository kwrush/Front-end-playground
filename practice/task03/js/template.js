(function(window, _u) {
    'use strict';
    
    /* @constructor */
/*    function Template() {};
    
    Template.prototype.show = function(template, data) {
        var i, 
            l = data.length,
            view = '';
            
        switch (template) {
            case 'category':
                for (i = l; i--) {
                    var template = this.defaultTemplate;
                    template = template.replace('{{title}}', data[i].title);
                    view += template;
                }
                break;
            case 'task':
                break;
        }
        
        return view;
    };*/
    
    /* @constructor */
    function CategoryListTemplate() {
        this.defaultTemplate
        = '<li>'
        +     '<h3>'
        +         '<i class="fa fa-tasks"></i>'
        +         '{{title}}'
        +         '<i class="fa fa-trash-o app-remove-btn"></i>'
        +     '</h3>'
        + '</li>';
    };

    CategoryListTemplate.prototype.add = function(categoryTitle) {
        var template = this.defaultTemplate,
            view = '';

        template = template.replace('{{title}}', categoryTitle);
        view += template;

        return view;
    }
    
    /* @constructor */
    function TaskListTemplate() {
        this.defaultTemplate
        = '<li>'
        +     '<h2>'
        +         '<i class="fa fa-folder-open"></i>{{title}}'
        +     '</h2>'
        + '</li>';
    };

    window.app = window.app || {};
    window.app.CategoryListTemplate = CategoryListTemplate;

}(window, _util));