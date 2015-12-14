// js/views/citylist.js

var app = app || {};

app.CityList = Backbone.View.extend({

	el: '',

	initialize: function() {
		this.$addBtn = $(.add-btn)[0];
		this.$list = $()

		this.listenTo(app.Cities, 'add', this.addCity);
	},

	addCity: function(city) {
		
	},

	newCity: function() {}
	
});