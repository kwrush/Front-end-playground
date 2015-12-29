// Cities stored
define([
    'underscore',
    'backbone',
    'backbone.localStorage',
    'models/app-w-city',
    'app-w-common'
], function(_, Backbone, Store, City, AppData) {
    'use strict';

    var Cities = Backbone.Collection.extend({
    	model: City,

    	localStorage: new Store(AppData.DB_NAME),

    	initialize: function() {
    		_.bindAll(this, 'addCity');
    	},

    	newCity: function(city) {
    		city.fetch({
    			success: this.addCity,
    			error: function() {
    				console.log('Cannot add this city...');
    			}
    		});

    		return this;
    	},

    	addCity: function(newModel, response) {
    		var duplicate = false;

    		// ignore the city if it's already in the collection
    		this.each(function(model, index) {
    			if (model.get('link') === newModel.get('link')) {
    				duplicate = true;
    				return;
    			}
    		});

    		if (!duplicate) {
    			this.create(newModel);
    			this.trigger('newCityAdded', newModel);
    		}

    		return newModel;
    	}
    });

    return Cities;
});
