// Upate cities list, update current weather by clicking city
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/app-w-cities',
    'app-w-common'
], function($, _, Backbone, Cities, AppData) {
    'use strict';

    var WeatherView = Backbone.View.extend({
        el: '#list',

        listTpl: _.template($('#list-template').html()),

        resultTpl: _.template($('#result-template').html()),

    	forecastTpl: _.template($('#forecast-template').html()),

    	titleTpl: _.template($('#title-template').html()),

        events: {
            'click .remove': 'removeItem',
            'click .update': 'updateItem',
            'click .city': 'selectCity'
        },

        initialize: function() {
            _.bindAll(this, 'showData');

    		this.$title = this.$('#result > h4');
            this.$list = this.$('#cities');
            this.$current = this.$('.current');
    		this.$forecast = this.$('.forecast');

            this.listenTo(this.collection, 'newCityAdded', this.updateList);
    		this.listenTo(this.collection, 'switchView', this.showForecast)
    		this.listenTo(this.collection, 'add', this.updateList);
            this.listenTo(this.collection, 'remove', this.updateList);

    		// Get collection from local storage
    		this.collection.fetch();
    		var model = this.collection.at(0);
    		model && this.acquire(model, false);

    		$('li.city').removeClass('select');
    		$($('li.city')[0]).addClass('select');
        },

        updateList: function(events) {
    		var self = this;
    		this.$list.html(
    			self.listTpl({ collection: this.collection.toJSON() })
    		);

    		return this;
    	},

    	removeItem: function(event) {
    		event.preventDefault();

    		var target = event.target;
    		var index = $(target).closest('li.city').index();

    		var model = this.collection.at(index);
    		model.destroy();

    		return this;
    	},

    	updateItem: function(event) {
    		event.preventDefault();

    		var target = event.target;
    		var index = $(target).closest('li.city').index();

    		var model = this.collection.at(index);

    		// fetch from server
    		return this.acquire(model, true);
    	},

    	selectCity: function(event) {
    		var target = event.target;

    		$('li.city').removeClass('select');

    		var select = $(target).closest('li.city');
    		var index = select.addClass('select').index();
    		var model = this.collection.at(index);

    		// fetch from cache
    		this.acquire(model, false);
    	},

    	acquire: function(model, online) {
    		model.fetch({
    			ajaxSync: online,
    			success: this.showData
    		});

    		return model;
    	},

    	showForecast: function(event) {
    		if (!event) return;

    		$('.switch a').removeClass('active');
    		$('#result ul').addClass('hide');

    		$('#to-' + event).addClass('active');
    		$('.' + event).removeClass('hide');

    		return this;
    	},

    	showData: function(model, response) {
    		var self = this;

    		model.setLocalTime();
    		model.save().done(function() {
    			self.render(model);
    		});

    		return this;
    	},

    	render: function(model) {
    		var self = this;

    		this.$title.html(this.titleTpl({ model: model.attributes }));

    		this.$current.html(
    			this.resultTpl({ model: model.attributes })
    		);

    		var results = model.getForecast();
    		this.$forecast.html(
    			this.forecastTpl({results: results})
    		);

    		return this;
    	}
    });

    return WeatherView;
});
