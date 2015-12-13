var app = app || {};

app.AppView = Backbone.View.extend({

	weatherDateTemplate: _.template( $('.weather-data li').html() ),

	initialize: function() {
		this.$input = $('#new-city');
		
	}
});