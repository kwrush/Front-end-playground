(function(window, _u) {
	'use strict';

	/**
	 * This view class
	 * @constructor
	 * @param {object} template object
	 */
	function AppView(template) {
		this.template = template;
		this.listWrapper = qs('.app-list[data-list-level="1"]');
		this.categoryListContainer = qs('li[data-list-type="category"]', this.listWrapper);
		this.categoryList = qs('.app-list[data-list-level="2"]', this.categoryListContainer);
		this.addCategoryBtn = gc('.app-add-category-btn')[0];
        this.addTaskBtn = gc('.app-add-task-btn')[0];
		this.todoList = qs('ol.app-task-list');
	};

	/**
	 * Render view with the give command and parameters
	 * @param {string} render view
	 */
	AppView.prototype.render = function(renderCmd, parameter) {
		var self = this;
		var renderCommands = {
			// expand or collapse list
			toggleCategoryList: function() {
				self.toggleCategoryList(parameter.list, parameter.icon);
			},
            
            // remove on item from category list
            removeCategory: function() {
                self.removeCategoryItem(parameter.listItem);
            }, 

            // add a item to category list
            addCategory: function() {
            	self.addCategoryItem(parameter.title);
            },

            addTask: function() {
                self.addTaskItem(parameter);
            },

            showCategory: function() {
            	self.showCategoryItems(parameter);
            },

            showTodos: function() {
            	self.showTodoItems(parameter);
            },
            
            clickOnAll: function() {

            },

            // show alert dialog
            alert: function() {
            	self.showAlert(parameter);
            }
		}

		renderCommands[renderCmd]();
	};

	/**
	 * Bind handler/callback with the given event
	 * @param {string} event name
	 * @param {function} handler/callback function that would excute as the given event is triggered
	 */
	AppView.prototype.bind = function(event, handler) {
		var self = this;
		if (event === 'toggleCategoryList') {
			delegate(self.categoryListContainer, 'li[data-list-type="category"] > a, i.app-folder-icon', 'click', function() {
				var iconSelector = '.app-folder-icon',

					// click event source
					src = this,

					// in case user click on icon or link (<i> or <a> tag) instead of the 
					// actual menu item, so, we check the click source type 
					// in order to get the correct list and icon object
					list = src.tagName === 'I' ? 
								src.parentNode.nextElementSibling : src.nextElementSibling,

					titleIcon = src.tagName === 'I'? 
								qs(iconSelector, src.parentNode) : 
								qs(iconSelector, src);
							

				handler({
					list: list,
					icon: titleIcon
				});
			});			

		}
		else if (event === 'removeCategory') {
       		delegate(self.listWrapper, 'i.app-trash-icon', 'click', function(evt) {
       			// prevent triggering <a> click event
       			evt.preventDefault(); 

                var select = self.showConfirm('Do you want to remove this category?');
                
                if (select) {
                    var elem = this,
                        a;

                    while(!(elem.tagName === 'LI')) {
                        elem.tagName === 'A' ? a = elem : null;   
                        elem = elem.parentNode;
                    } 

                    var title = a.innerText.trim();

                    handler({ 
                            title: title,
                            listItem: elem, 
                        });	
                }                        
       		});  
		}
		else if (event === 'addCategory') {
			_u.addEvent(self.addCategoryBtn, 'click', function() {
				var categoryName = self.showPrompt('Please enter the category name:', ''); 

				handler({ title: categoryName });
			});
		}
        else if (event === 'addTask') {
            
        }
		else if (event === 'clickCategoryItem') {
			delegate(self.listWrapper, '.app-list[data-list-level="2"] li > a', 'click', function(evt) {
				var src = this,
                    item = src.tagName === 'I' ?
                        src.parentNode : src,

                    categoryTitle = item.dataset.title,

                    listItems = qsa('li > a', self.listWrapper);

                for (var len = listItems.length, i = len; i--; ) {
                    _u.removeClass(listItems[i], 'app-active-item') ;
                }

                _u.addClass(item, 'app-active-item');

                handler(item.dataset.title);
			});
		}
        else if (event === 'clickOnAll') {
            delegate(self.listWrapper, 'li[data-list-type="all"] > a, i.fa-list-alt', 'click', function(evt) {
                var iconSelector = '.fa-list-alt',
                    src = this,
                    listItems = qsa('li > a', self.categoryLis),
                    
                    item = src.tagName === 'I' ?
                        src.parentNode : src;
                    
                for (var len = listItems.length, i = len; i--; ) {
                    _u.removeClass(listItems[i], 'app-active-item')
                }
                        
                _u.hasClass(item, 'app-active-item') ? 
                    null : _u.addClass(item, 'app-active-item'); 
                    
                handler();
            });
        }
	};

	AppView.prototype.toggleCategoryList = function(list, icon) {
		if (_u.hasClass(list, 'app-list-collapse')) {
			_u.removeClass(list, 'app-list-collapse');
			icon ? icon.className = 'fa fa-folder-open app-folder-icon' : null;
		}
		else {
			_u.addClass(list, 'app-list-collapse');
			icon ? icon.className = 'fa fa-folder app-folder-icon' : null;
		}
	};
    
    AppView.prototype.removeCategoryItem = function(listItem) {
    	listItem.parentNode.removeChild(listItem);   
    };

    AppView.prototype.addCategoryItem = function(itemName) {  
    	var self = this;  	
    	self.categoryList.innerHTML += self.template.addCategory(itemName);
    };

    AppView.prototype.showAlert = function(msg) {
    	alert(msg);
    };

    AppView.prototype.showCategoryItems = function(categoryTitle) {
    	var temp = '';
    	for (var i = 0; i < categoryTitle.length; i++) {
    		temp += this.template.addCategory(categoryTitle[i]);
    	}

    	this.categoryList.innerHTML = temp;
    };

    AppView.prototype.showTodoItems = function(todos) {
    	var temp = '';

    	for (var key in todos) {

    		var todoObj = {
    			todoDate: new Date(key),
    			items: todos[key]
    		};

    		temp += this.template.addTodoList(todoObj);
    	}

    	this.todoList.innerHTML = temp;
    };

    AppView.prototype.showConfirm = function(msg) {
    	var select = confirm(msg);
    	return select;
    };

    AppView.prototype.showPrompt = function(msg) {
    	var input = prompt(msg);
    	return input;
    }

	// Export to window
	window.app = window.app || {};
	window.app.AppView = AppView;

}(window, _util));