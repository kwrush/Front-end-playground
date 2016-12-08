/*
 * no auto complete as the ajax calls per minute are limited with free key...
 */
// constant
var AppData = {
	DB_NAME         : 'app-w',
	BASE_URL        : 'http://api.wunderground.com',
	FORECAST_FEATURE: 'conditions/forecast/geolookup',
	GEO_FEATURE     : 'geolookup',
	DATA_FORMAT     : 'json',
	API_KEY         : 'c9914a3fccc20133',
	KEY_ENTER       : 13,
	KEY_BACKSPACE   : 8,
	MONTH           : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

var AppRouter = Backbone.Router.extend({
	routes: {
		"*current": "switchView",
		"*forecast": "switchView"
	},

	initialize: function(options) {
		this.cities = options['cities'];
	},

	switchView: function(param) {
		this.cities.trigger('switchView', param);
	}
});

/*
 * Search
 */
var Result = Backbone.Model.extend({
	defaults: {
		query: '',
		response: null
	},

	initialize: function() {
		console.log('Result model has been initialized.');
	},

	url: function() {
		return AppData.BASE_URL + '/api/'
			+ AppData.API_KEY + '/'
			+ AppData.GEO_FEATURE + '/q/'
			+ this.get('query') + '.'
			+ AppData.DATA_FORMAT;
	}
});

// Show the matched cities from the given input
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

		input = input.replace(/\s+/g, '').replace(/[^\w]+/g, '/');

		this.model.clear()
                  .set(this.model.defaults)
                  .set({ query: input })
                  .fetch({
                      success: this.render
                  });
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
		else if (this.model.get('location')) {
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
        else if (this.model.get('location')) {
            var location = this.model.get('location');
            city = new City({ link: location.l });
        }

        city && this.collection.newCity(city);
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


/*
 * Show result
 */
var City = Backbone.Model.extend({
	defaults: {
        link: '', // /q/link_code
		localTime: '', // hh:mm, MM dd
		location: null,
		current_observation: null,
		forecase: null
	},

    validate: function(attrs) {
        if (!attrs.link) {
            return 'Query link cannot be empty.';
        }
    },

	initialize: function() {
		console.log('City model has been initialized.');
	},

	fetchFromServer: function(options) {
		return Backbone.Model.prototype.fetch.call(this, options);
	},

	setLocalTime: function() {
		if (!this.attributes.current_observation) return;

		var timeString = new Date().toLocaleString('en-US', { timeZone: this.get('current_observation').local_tz_long });
		var date = new Date(timeString);

		var localTime = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
		    + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ', '
			+ AppData.MONTH[date.getMonth()] + ' '
			+ (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

		this.set({ localTime: localTime });
	},

	getForecast: function() {
		var forecast = [];

		if (this.get('forecast')) {
			var data = this.get('forecast').simpleforecast.forecastday;

			for (var i = 0; i < data.length; i++) {
				var dataItem = data[i];

				var date = dataItem.date.weekday_short + ', '
					+ AppData.MONTH[parseInt(dataItem.date.month, 10) - 1] + ' '
					+ dataItem.date.day;

				var tempHigh = dataItem.high.celsius;
				var tempLow = dataItem.low.celsius;

				var iconURL = dataItem.icon_url;
				var iconName = dataItem.icon;

				var item = {
					date: date,
					temp_c_h: tempHigh,
					temp_c_l: tempLow,
					icon_url: iconURL,
					icon_name: iconName
				};

				forecast.push(item);
			}
		}

		return forecast;
	},

	url: function() {
		return AppData.BASE_URL + '/api/'
			+ AppData.API_KEY + '/'
			+ AppData.FORECAST_FEATURE
			+ this.get('link') + '.'
			+ AppData.DATA_FORMAT;
	}

});

var Cities = Backbone.Collection.extend({
	model: City,

	localStorage: new Backbone.LocalStorage(AppData.DB_NAME),

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
	}
});

// Upate cities list, update current weather by clicking city
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
	},

	removeItem: function(event) {
		event.preventDefault();

		var target = event.target;
		var index = $(target).closest('li.city').index();

		var model = this.collection.at(index);
		model.destroy();
	},

	updateItem: function(event) {
		event.preventDefault();

		var target = event.target;
		var index = $(target).closest('li.city').index();

		var model = this.collection.at(index);

		// fetch from server
		this.acquire(model, true);
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
	},

	showForecast: function(event) {
		if (!event) return;

		$('.switch a').removeClass('active');
		$('#result ul').addClass('hide');

		$('#to-' + event).addClass('active');
		$('.' + event).removeClass('hide');
	},

	showData: function(model, response) {
		var self = this;

		model.setLocalTime();
		model.save().done(function() {
			self.render(model);
		});
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


// init
$(function() {
	var rs = new Result();
    var cities = new Cities();
	var searchView = new SearchView({ model: rs, collection: cities });
    var weatherView = new WeatherView({ collection: cities });

	var router = new AppRouter({cities: cities});
	Backbone.history.start();
});
