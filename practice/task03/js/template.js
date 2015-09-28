(function(window, _u) {
    'use strict';

    
    /** 
     * Template provides various default views
     * @constructor 
     */
    function AppTemplate() {
        this.categoryItemTemplate
        = '<li>'
        +     '<a href="#/{{href}}">'
        +         '<i class="fa fa-tasks app-tasks-icon"></i>'
        +         '{{title}}'
        +         '<i class="fa fa-trash-o app-trash-icon"></i>'
        +     '</a>'
        + '</li>';
    };

    AppTemplate.prototype.addCategory = function(categoryTitle) {
        var template = this.categoryItemTemplate,
            view = '';

        // relpace spaces in title and insert to <a>'s herf
        template = template.replace('{{href}}', categoryTitle.replace(/\s/g, '%20'));
        template = template.replace('{{title}}', categoryTitle);
        view += template;

        return view;
    }


    window.app = window.app || {};
    window.app.AppTemplate = AppTemplate;

}(window, _util));