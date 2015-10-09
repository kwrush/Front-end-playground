(function() {
	var textArea = document.getElementsByClassName('habbit-input')[0];
	var btn = document.getElementsByClassName('habbit-btn')[0];
	var show = document.getElementsByClassName('show')[0];
	
	var contentArr = null;
	
	_util.addEvent(btn, 'click', submit);
	
	_util.addEnterEvent(textArea, 'keypress', inputMonitor);
	_util.addEvent(textArea, 'keydown', inputMonitor);
	_util.addEvent(textArea, 'keyup', inputMonitor);
	
	function submit(e) {
		if (!contentArr) return;
		
		// remove duplicate items, capitalize first letter
		contentArr = _util.uniqArray(contentArr.join(',').toLowerCase().split(','));
		
		var checkBox = '';
		for (var i = 0, len = contentArr.length; i < len; i++) {
			
			contentArr[i] = contentArr[i].toLowerCase().charAt(0).toUpperCase() + contentArr[i].substring(1);
		
			checkBox += '<p><label><input type="checkbox" name="checkbox" value="' 
				         + contentArr[i] + '">' + contentArr[i] + '</label></p>';
		}
		
		show.innerHTML = checkBox;
	}
	
	function inputMonitor(e) {
		var content = textArea.value;
		contentArr = _util.trim(content).split(/[\n\s+,£¬;£»:£»¡¢]/);

		if (isEmptyString(content)) {
			var warn = '<p class="warn">Please enter your habbits...</p>';
			btn.disabled = true;
			show.innerHTML = warn;
		}
		else if (contentArr.length > 10) {
			var warn = '<p class="warn">No more than 10 habbits...</p>';
			btn.disabled = true;
			show.innerHTML = warn;
			
			contentArr = contentArr.splice(0, 10);
		}
		else {
			show.innerHTML = '';
			btn.disabled = btn.disabled ? false : btn.disabled;
		}
	}
	
	function isEmptyString(str) {
		return (!str || str.length === 0);
	}
	
})();