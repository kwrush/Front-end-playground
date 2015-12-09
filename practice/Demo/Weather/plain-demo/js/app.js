(function() {
	'use strict';

	function Weather() {
		this.model = new app.Model();
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var weather = new Weather();

	function setView() {
		weather.controller.setView();
	}

	window.onload = function() {
		setView('Arnhem');
	}
})();