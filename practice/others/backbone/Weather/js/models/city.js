// js/model/city.js

var app = app || {};

app.City = Backbone.Model.extend({

	defaults: {
		name: '',
		state: '',
		country: '',
		query: null,
		localTime: null,
		temperature: null,
		weather: null,
	},

	initialize: function() {
		console.log(this.name + ' is created.');
	}
});