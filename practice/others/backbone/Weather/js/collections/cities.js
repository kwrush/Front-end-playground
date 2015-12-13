var app = app || {};

var CityList = Backbone.Collection.extend({

	model: app.City,

	localStorage: new Backbone.LocalStorage('weather-backbone'),
});

app.Cities = new CityList();