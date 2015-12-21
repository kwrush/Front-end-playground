// constant
var AppData = {
	DB_NAME      : 'app-w',
	BASE_URL     : 'http://api.wunderground.com',
	DATA_FEATURE : 'conditions/geolookup/q',
	DATA_FORMAT  : 'json',
	API_KEY      : 'c9914a3fccc20133',
	KEY_ENTER    : 13,
	KEY_BACKSPACE: 8
}

/*
 * Search
 */ 
var Result = Backbone.Model.extend({
	defaults: {
		query: '',
		response: null,
		results: null
	},

	initialize: function() {
		this.instanceUrl = this.makeUrl();

		console.log('Result model has been initialized.');
	},

	makeUrl: function() {
		return AppData.BASE_URL + '/' 
			+ AppData.API_KEY + '/' 
			+ AppData.DATA_FEATURE + '/' 
			+ this.get('query') + '.'
			+ AppData.DATA_FORMAT;
	},

	url: function() {
		return this.instanceUrl;
	}
});

// Show the possible cities from the given input
var SearchView = Backbone.View.extend({

});


/*
 * Show result 
 */
var City = Backbone.Model.extend({
	defaults: {
		response: null,
		location: null,
		current_observation: null
	},

	initialize: function() {

		console.log('City model has been initialized.');
	}

});

var Cities = Backbone.Collection.extend({
	model: City,

	localStorage: new Backbone.LocalStorage(AppData.DB_NAME)
});

// Upate cities list, update current weather by clicking city 
var ResultView = Backbone.View.extend({

});


// init
$(function() {

});