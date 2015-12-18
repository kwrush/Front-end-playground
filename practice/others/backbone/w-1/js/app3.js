var Book = Backbone.Model.extend({
	defaults: {
		title: 'Book'
	},

	initialize: function() {
		console.log('Book has been created.');
	}
});

var BookList = Backbone.Collection.extend({
	model: Book,

	initialize: function() {
		console.log('Book list has been created.');
	}
});

var InputView = Backbone.View.extend({
	el: '#enter',

	events: {
		'click #add-btn': 'addBook'
	},

	initialize: function() {
		this.input = $('#input-area');
	},

	addBook: function(evt) {
		var title = $('#input-area').val().trim();

		if (title.length === 0) return;

		this.collection && this.collection.add(new Book({ title: title }));
	}
});

var BookView = Backbone.View.extend({
	el: '#list',

	tpl: _.template($('#list-template').html()),

	events: {
		'click a.remove-btn': "removeBook"
	},

	initialize: function() {
		var self = this;
		this.list = $('#list ul');

		this.listenTo(this.collection, 'add', this.update);
		this.listenTo(this.collection, 'remove', this.update);
	},

	update: function() {
		this.render();
	},

	removeBook: function(event) {
		event.preventDefault();

		var target = event.target;
		var index = $(target).index();

		this.collection.remove(this.collection.at(index - 1));		
	},

	render: function() {
		var self = this;
		this.list.html( self.tpl( {
			collection: this.collection.toJSON()
		} ) );

		return this;
	}
});

$(function() {
	var list = new BookList();
	var inputView = new InputView({ collection: list });
	var listView = new BookView({ collection: list });
});