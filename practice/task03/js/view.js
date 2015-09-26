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
		this.categorylist = qs('.li[data-list-type="category]', this.listWrapper);
		this.list = qs('.app-list[data-list-level="2"]', this.categorylist);
		this.addCategoryBtn = qs('.app-add-category-btn');
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
			_u.delegateEvent(self.listWrapper, 'h2', 'click', function() {
				var iconSelector = '[class^="fa"]',

					// click event source
					src = this,

					// in case user click on icon (<i> tag) instead of the 
					// actual menu item, so, we check the click source type 
					// in order to get the correct list and icon object
					list = src.tagName === 'I' ? 
								 src.parentNode.nextElementSibling : src.nextElementSibling,

					titleIcon = src.tagName === 'I' ? 
								 qs(iconSelector, src.parentNode) : 
								 qs(iconSelector, src);
							

				handler({
					list: list,
					icon: titleIcon
				});
			});			

		}
		else if (event === 'removeCategory') {
       		delegate(self.listWrapper, 'i.app-remove-btn', 'click', function() {
       			
       			var elem = this;

				while(!(elem.tagName === 'LI')) {
					elem = elem.parentNode;
				}  

				handler({ listItem: elem });			
       		});  
		}
		else if (event === 'addCategory') {
			_u.addEvent(self.addCategoryBtn, 'click', function() {
				var categoryName = prompt('Please enter the category name:', ''); 
					handler({ title: categoryName });
			});
		};
	};

	AppView.prototype.toggleCategoryList = function(list, icon) {
		if (_u.hasClass(list, 'app-list-collapse')) {
			_u.removeClass(list, 'app-list-collapse');
			icon ? icon.className = 'fa fa-folder-open' : null;
		}
		else {
			_u.addClass(list, 'app-list-collapse');
			icon ? icon.className = 'fa fa-folder' : null;
		}
	};
    
    AppView.prototype.removeCategoryItem = function(listItem) {
    	var opt = confirm('Do you want to remove this category?');
    	var list = listItem.parentNode;
        opt ? listItem.parentNode.removeChild(listItem) : null;   
    };

    AppView.prototype.addCategoryItem = function(itemName) {  
    	var self = this;  	
    	self.list.innerHTML += self.template.addCategory(itemName);
    };

    AppView.prototype.showAlert = function(msg){
    	alert(msg);
    };

	// Export to window
	window.app = window.app || {};
	window.app.AppView = AppView;

}(window, _util));