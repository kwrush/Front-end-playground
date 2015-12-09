(function(window) {
	'use strict';

	function Template() {
		this.tempUnit = '&#8451';
		this.defaultTemplate 
		= '<li data-name="date">'
		+     '{{date}}'
		+ '</li>'
		+ '<li data-name="temp">'
		+     '{{temp}}' + this.tempUnit
		+ '</li>'
		+ '<li data-name="weather">'
		+     '{{weather}}'
		+ '</li>';
	};

	Template.prototype.show = function(data) {
		var template = this.defaultTemplate;

		template = template.replace('{{date}}', data.date);
		template = template.replace('{{temp}}', data.temperature);
		template = template.replace('{{weather}}', data.weather);

		return template;
	};

	window.app = window.app || {};
	window.app.Template = Template;

})(window);