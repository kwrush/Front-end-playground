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
		this.addCategoryBtn = gc('app-add-category-btn')[0];
        this.addTaskBtn = gc('app-add-task-btn')[0];
		this.todoList = qs('ol.app-task-list');
        this.filterNav = qs('ul.app-filter-nav');
        this.todoTitle = gid('app-todo-title');
        this.todoTime = gid('app-todo-date');
        this.todoContent = qs('.app-task-content-editor > textarea');
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

            removeTodo: function() {
                self.removeTodoItem(parameter);
            },
            
            clickOnFilter: function() {
                self.showTasksByFilter
            },

            showTodoContent: function() {
                self.showTodoContent(parameter);
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
                    filter = qs('.app-active-filter'),
                    item = src.tagName === 'I' ?
                        src.parentNode : src,

                    categoryTitle = item.dataset.title,

                    listItems = qsa('li > a', self.listWrapper);

                for (var len = listItems.length, i = len; i--; ) {
                    _u.removeClass(listItems[i], 'app-active-item') ;
                }

                _u.addClass(item, 'app-active-item');

                handler({
                    category: item.dataset.title, 
                    status: filter.innerText});
			});
		}
        else if (event === 'clickOnAll') {
            delegate(self.listWrapper, 'li[data-list-type="all"] > a, i.fa-list-alt', 'click', function(evt) {
                var iconSelector = '.fa-list-alt',
                    filter = qs('.app-active-filter'),
                    src = this,
                    listItems = qsa('li > a', self.categoryLis),
                    
                    item = src.tagName === 'I' ?
                        src.parentNode : src;
                    
                for (var len = listItems.length, i = len; i--; ) {
                    _u.removeClass(listItems[i], 'app-active-item')
                }
                        
                _u.hasClass(item, 'app-active-item') ? 
                    null : _u.addClass(item, 'app-active-item'); 
                    
                handler(filter.innerText);
            });
        }
        else if (event === 'removeTask') {
            delegate(self.todoList, '.app-task-list .fa-times', 'click', function(evt) {
                evt.preventDefault();

                var select = self.showConfirm('Do you want to remove this item?');

                if (select) {
                    var elem = this,
                        category = qs('.app-active-item'),
                        a;

                    // wrapper wraps this item
                    while(!(elem.tagName === 'LI')) {
                        elem.tagName === 'A' ? a = elem : null;   
                        elem = elem.parentNode;
                    } 


                    var id = elem.dataset.taskId.trim();

                    handler({ 
                            id: id,
                            listItem: elem, 
                            //wrapper: parentElem,
                            activeCategory: category.innerText
                        }); 
                }
            });
        }
        else if (event === 'clickOnFilter') {
            delegate(self.filterNav, '.app-filter', 'click', function(evt) {
                var fLi = self.filterNav.children,
                    selectCategory = qs('a.app-active-item');
                for (var len = fLi.length, i = len; i--; ) {
                    _u.removeClass(fLi[i], 'app-active-filter');
                } 
                
                _u.addClass(this, 'app-active-filter');
                
                var status = this.innerText,
                    category = selectCategory.innerText;
                    
                handler({
                    category: category,
                    status: status
                });
            });
        }
        else if (event === 'clickTaskItem') {
            delegate(self.todoList, '.app-tasks > li > a', 'click', function(evt) {
                evt.preventDefault();
                
                var id = this.parentElement.dataset.taskId,
                    category = qs('a.app-active-item').innerText;
                
                handler({
                    category: category,
                    id: id
                });
            });
        }
	};

    /**
     * Expand and shrink category list
     * @param {object} DOM object
     * @param {object} DOM object
     */
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


    /**
     * Remove select category item from the list 
     * @param {object} DOM object
     */
    AppView.prototype.removeCategoryItem = function(listItem) {
    	listItem.parentNode.removeChild(listItem);   
    };

    /**
     * Append new category item to the list
     * @param {string} New category name
     */
    AppView.prototype.addCategoryItem = function(itemName) {  
    	var self = this;  	
    	self.categoryList.innerHTML += self.template.addCategory(itemName);
    };

    /**
     * show alert with the given message
     * @param {string} message
     */
    AppView.prototype.showAlert = function(msg) {
    	alert(msg);
    };

    /**
     * Render category list based on given category title array
     * @param {array} category title array
     */
    AppView.prototype.showCategoryItems = function(categoryTitle) {
    	var temp = '';
    	for (var i = 0; i < categoryTitle.length; i++) {
    		temp += this.template.addCategory(categoryTitle[i]);
    	}

    	this.categoryList.innerHTML = temp;
    };


    /**
     * Render todo list based on given todo objects list
     * @param {object} todo objects list
     */
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

    AppView.prototype.showTodoContent = function(todo) {
        var category = todo.category,
            title = todo.title,
            time = new Date(todo.todoDate),
            status = todo.status,
            content = todo.description,

            formattedTime = time.getFullYear() + 
                            '-' + time.getMonth() + 
                            '-' + time.getDate() + 
                            ' ' + time.getHours() + 
                            ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());

        this.todoTitle.value = title;
        this.todoTime.value = formattedTime;
        this.todoContent.innerText = content;
    };

    /**
     * Rmove todo item with the give id
     * @param {id} id string
     */
    AppView.prototype.removeTodoItem = function(id) {
        var selector = 'li[data-task-id="' + id + '"]',
            todoLi = qs(selector),
            liWrapper = todoLi.parentNode;

        liWrapper.removeChild(todoLi);

        // if this is the last item within this list, remove this list
        if (!liWrapper.childNodes.length) {
            var sub = liWrapper,
                parent = sub;
            while (!(parent.tagName === 'OL')) {
                parent.tagName === 'LI' ? sub = parent : null;
                parent = parent.parentNode;
            }

            parent.removeChild(sub);
        }
    };

    /**
     * Show a comfirm didlog
     * @param {string} confirm message
     */
    AppView.prototype.showConfirm = function(msg) {
    	var select = confirm(msg);
    	return select;
    };

    /**
     * Show an dialog
     * @param {string} message 
     */
    AppView.prototype.showPrompt = function(msg) {
    	var input = prompt(msg);
    	return input;
    }

	// Export to window
	window.app = window.app || {};
	window.app.AppView = AppView;

}(window, _util));