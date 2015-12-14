var app = app || {};

app.AppView = Backbone.View.extend({

	//suggestTemplate: _.template( $('#suggest-template').html() ),

	//cityListTemplate: _.template( $('#citylist-template').html() ),

	weatherDateTemplate: _.template( $('.weather-data li').html() ),

	initialize: function() {
		this.$input = $('#new-city');
		this.$addBtn = $('.add-btn')[0];

		//this.listenTo(app.Cities, 'add', this.addCity);
		this.listenTo(app.Result, 'change', this.showResult);
	},

	addCity: function(city) {

	}
});