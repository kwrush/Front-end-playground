// js/views/suggest.js

var app = app || {};

app.AppView.SuggestView = Backbone.View.extend({

	suggestTemplate: _.template( $('#suggest-template').html() ),

	events: {
		'keydown #new-city': 'showSuggest'
	},

	initialize: function() {
		this.$input = $('#new-city');
		this.$suggest = $('#suggest');
	},

	show: function() {
		this.$suggest.removeClass('hide');
	},

	hide: function() {
		this.$suggest.addClass('hide');
	},

	showSuggest: function(event) {
		if (event.keycode !== 8) {
			var val = this.$input.val();
			$.ajax({
				url: URL + 'q/Beijing.json',
				type: 'GET',
				success: function(data) {
					this.handleResponse(data);
				},
				error: function(err) {
					this.hide();	
				}
			});
		}
	},

	handleResponse: function(data) {

		if (data.current_observation) {

		}

		else if (data.response) {
			var rs = data.response;
			if (rs.error) {

			}
			else if (rs.results) {

			}
		}
	}
});