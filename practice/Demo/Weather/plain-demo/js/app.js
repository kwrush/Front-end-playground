(function() {
	'use strict';

	function Weather(name) {
		this.model = new app.Model();
		this.template = new app.Template();
		this.view = new app.View(template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var weather = new Weather('plain-weather');

	function buildView(cmd) {
		weather.controller.bindView(cmd);
	}

	window.onload = function() {
		buildView(document.location.hash);
	}
})();