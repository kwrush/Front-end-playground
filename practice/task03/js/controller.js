var subs = document.getElementsByClassName('app-category-sub-menu');
for (var i = 0, len = subs.length; i < len; i++) {
	_util.addEvent(subs[i], 'click', function(evt) {
		if (_util.hasClass(this, 'app-task-list-collapse')) {
			_util.removeClass(this, 'app-task-list-collapse');
		}
		else {
			_util.addClass(this, 'app-task-list-collapse');
		}
	});
}

