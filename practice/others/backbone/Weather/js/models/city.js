// js/model/city.js

var app = app || {};

var City = Backbone.Model.extend({

	defaults: {
		name: '',
		state: '',
		country: '',
		query: null,
		localTime: null,
		temperature: null,
		weather: null,
	}
});