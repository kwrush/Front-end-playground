var 

	treeView = (function(ut){

		return {
			/**
			 * Initialize action when user clicks on the treeview menu item
			 * @param {String} holderId id of the wrapper of the treeview menu  
			 */
			initTreeView: function(holderId) {
				var 
					$ = document,
					treeViewHolder = $.getElementById(holderId),

					// listener to the click event on h3 node
					toggleTreeviewMenu = function(evt) {

						var iconSelector = '[class^="fa"]',

							// in case user click on icon (<span> tag) instead of the actual menu item
							parentNode = this.tagName === 'SPAN' ? this.parentNode.parentNode : this.parentNode,
							folderIcon = this.tagName === 'SPAN' ? this.parentNode.querySelectorAll(iconSelector)[0] : this.querySelectorAll(iconSelector)[0],

							treemenu = parentNode.querySelectorAll('.app-menu-treeview')[0];

						if (ut.hasClass(treemenu, 'app-menu-collapse')) {
							ut.removeClass(treemenu, 'app-menu-collapse');
							folderIcon ? folderIcon.className = 'fa fa-folder-open' : null;
						}
						else {
							ut.addClass(treemenu, 'app-menu-collapse');
							folderIcon ? folderIcon.className = 'fa fa-folder' : null;
						}
					},

					// listener to click event on h4 node (task item)
					showTaskDescription = function(evt) {
						if (!this.hasAttributes('data-task-index')) {
							console.log('The element do not have "data-task-index" attribute');
							return;
						}

						var self = this.tagName === 'I' ? this.parentNode : this,
							peer = $.querySelectorAll(self.tagName + '[data-menu-level="3"]');

						ut.each(peer, function(item) {
							item.className = 'app-category-title';
						});

						self.className = 'app-category-title-active';

						// more...
					};
                    
                    // listener to mouse enter/out event on menu item
                    toggleDeleteIcon = function(evt) {
                        var evt = evt || window.event;
                        if (evt.type === 'mouseenter') {
                            console.log('enter.............');
                        }
                        else if(evt.type === 'mouseleave') {
                            console.log('leave.............');
                        }
                    }


				// event delegation, add <span> and <i> in case use click on the icon overlayed
				ut.delegateEvent(treeViewHolder, 'h3', 'click', toggleTreeviewMenu);
				ut.delegateEvent(treeViewHolder, 'span', 'click', toggleTreeviewMenu);
				ut.delegateEvent(treeViewHolder, 'h4', 'click', showTaskDescription);
				ut.delegateEvent(treeViewHolder, 'i', 'click', showTaskDescription);
                ut.delegateEvent(treeViewHolder, 'h3', 'mouseenter', toggleDeleteIcon);
				ut.delegateEvent(treeViewHolder, 'span', 'mouseover', toggleDeleteIcon);
			},

			/**
			 * Set style according to the given style map, 
			 * e.g. selector = '.classname', styleMap = {backgroundColor: red}.
			 * @param {String} or {HTML DOM} selector selector string or a DOM element
			 * @param {Object} styleMap style map defines the style you want to set 
			 */
			resetStyle: function(selector, styleMap) {

				if (!ut.isString(selector) && !selector.nodeName) {

					console.log('Selector should be a string or a DOM element.');
					return;
				}

				if (!ut.isPlainObject(styleMap)) {
					console.log('styleMap should be a plain object');
					return;
				}

				var el = selector.nodeName ? selector : Sizzle(selector),
					len = el.length,
					i;

				if (!len) {
					for (var prop in styleMap) {
						el.style[prop] = styleMap[prop];
					}
				}
				else {

					for (i = 0; i < len; i++) {
						for (var prop in styleMap) {
							el[i].style[prop] = styleMap[prop];
						}
					}
				}
			}
		}

	})(_util),

	addCategory = (function(ut) {
						

	})(_util), 

	addTask = (function(ut) {


	})(_util);