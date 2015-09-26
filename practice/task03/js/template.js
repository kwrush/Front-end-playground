(function(window, _u) {
    'use strict';

    
    /** 
     * Template provides various default views
     * @constructor 
     */
    function AppTemplate() {
        this.categoryItemTemplate
        = '<li>'
        +     '<h3>'
        +         '<i class="fa fa-tasks"></i>'
        +         '{{title}}'
        +         '<i class="fa fa-trash-o app-remove-btn"></i>'
        +     '</h3>'
        + '</li>';
    };

    AppTemplate.prototype.addCategory = function(categoryTitle) {
        var template = this.categoryItemTemplate,
            view = '';

        template = template.replace('{{title}}', categoryTitle);
        view += template;

        return view;
    }




    window.app = window.app || {};
    window.app.AppTemplate = AppTemplate;

}(window, _util));