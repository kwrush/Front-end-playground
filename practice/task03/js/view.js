(function(window, _u) {
	'use strict';

	function CategoryListView(template) {
		this.template = template;
		this.listWrapper = qs('.app-list[data-list-level="1"]');
		this.categoryList = qs('li[data-list-type="category"]', this.listWrapper);
	};

	CategoryListView.prototype.render = function(renderCmd, parameter) {
		var self = this;
		var renderCommands = {
			toggleList: function() {
				self.toggleList(parameter.list, parameter.icon);
			}
		}

		renderCommands[renderCmd]();
	};

	CategoryListView.prototype.bind = function(event, handler) {
		var self = this;
		if (event === 'toggleList') {
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
		else if (event === 'delete') {

		}
	};

	CategoryListView.prototype.toggleList = function(list, icon) {
		// set a height to the list or its wrapper 
		// in order to animate expand/collapse 

		if (_u.hasClass(list, 'app-list-collapse')) {
			_u.removeClass(list, 'app-list-collapse');
			icon ? icon.className = 'fa fa-folder-open' : null;
		}
		else {
			list.style.maxHeight = list.scrollHeight + 'px';
			_u.addClass(list, 'app-list-collapse');
			icon ? icon.className = 'fa fa-folder' : null;
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.CategoryListView = CategoryListView;

}(window, _util));