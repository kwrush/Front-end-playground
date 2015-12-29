// Show the matched cities from the given input
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/app-w-cities',
    'app-w-common'
], function($, _, Backbone, Cities, AppData) {
    'use strict';

    var SearchView = Backbone.View.extend({
    	el: '#edit',

    	suggestTpl: _.template($('#suggest-template').html()),

    	events: {
            'keypress #city-edit': 'enterSearch',
    		'click #search-btn': 'search',
    		'click #suggest': 'select',
    		'click #add-btn': 'addNew'
    	},

    	initialize: function() {
    		this.model = this.model ? this.model : new Result();

    		this.$edit = this.$('#city-edit');
    		this.$searchBtn = this.$('search-btn');
    		this.$addBtn = this.$('#add-btn');
    		this.$suggestList = this.$('#suggest');

            _.bindAll(this, 'render');
    	},

        enterSearch: function(event) {
            if (event.keyCode === AppData.KEY_ENTER) {
                this.search();
            }
        },

    	search: function() {
    		var input = this.$edit.val().trim();
    		if (!input) return;

    		input = input.replace(/[^\w\s]+/g, '/');

    		this.model.clear()
                      .set(this.model.defaults)
                      .set({ query: input })
                      .fetch({
                          success: this.render
                      });

    		return this;
    	},

        render: function() {
            var rs = [];

            if (this.model.get('response').results) {
    			rs = this.model.get('response').results;
    		}
            else if (this.model.get('response').error) {
                var err = this.model.get('response').error.description;
                rs.push({ error: err });
            }
    		else if (this.model.has('location')) {
    			rs.push(this.model.get('location'));
    		}
            else {
                rs.push({ error: 'Unknown error, get nothing from the server.' });
            }

    		this.$suggestList.html(
    			this.suggestTpl({ results: rs })
    		);

            return this;
        },

    	addNew: function() {
    		if (this.selectIndex === undefined
    			|| this.selectIndex === null) return;

            var index = this.selectIndex

            var city = null;
            if (this.model.get('response').results) {
                var rs = this.model.get('response').results[index];
                city = new City({ link: rs.l});
            }
            else if (this.model.has('location')) {
                var location = this.model.get('location');
                city = new City({ link: location.l });
            }

            return city && this.collection.newCity(city);
    	},

    	select: function(event) {
    		var target = event.target;
    		if (target.tagName !== 'LI') return;

    		this.$suggestList.find('li').removeClass('select');
    		$(target).addClass('select');
    		this.selectIndex = $(target).index();

            this.$edit.val(target.innerText);
    	}
    });

    return SearchView;
});
