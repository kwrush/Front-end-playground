(function(window) {
    'use strict';
    
    /* @constructor */
    function Template() {};
    
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
    };
    
    /* @constructor */
    function CategorListTemplate() {
        this.defaultTemplate
        = '<li>'
        +     '<h3>'
        +         '<i class="fa fa-folder"></i>{{title}}'
        +     '</h3>'
        + '</li>';
    };
    
    /* @constructor */
    function TaskListTemplate() {
    }
}());