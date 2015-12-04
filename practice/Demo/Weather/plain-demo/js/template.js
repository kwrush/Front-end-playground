(function(window) {
	'use strict';

	function Template() {
		this.defaultTemplate 
		= '<li data-name="current-date">'
		+     '{{date}}'
		+ '</li>'
		+ '<li date-name="temp">'
		+     '{{temp}}&#8451';
		+ '</li>'
		+ '<li date-name="weather">'
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

})(window);