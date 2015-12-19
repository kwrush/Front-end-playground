var Book = Backbone.Model.extend({
	defaults: {
		title: 'Book title',
		intro: 'Book intro'
	},

	initialize: function() {
		console.log('Book has been created.');
	}
});

var BookList = Backbone.Collection.extend({
	model: Book,

	localStorage: new Backbone.LocalStorage('bb-test-3'),

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
		this.titleEdit = $('#title-edit');
		this.introEdit = $('#intro-edit');
	},

	newBook: function() {
		return {
			title: this.titleEdit.val().trim(),
			intro: this.introEdit.val().trim()
		};
	},

	addBook: function(evt) {
		var title = this.titleEdit.val().trim();

		if (title.length === 0) return;

		this.collection && this.collection.create( this.newBook() );

		this.titleEdit.val('');
		this.introEdit.val('');
	}
});

var BookView = Backbone.View.extend({
	el: '#list',

	listTpl: _.template($('#list-template').html()),

	introTpl: _.template($('#intro-template').html()),

	events: {
		'click a.remove-btn': 'removeBook',
		'click li.item': 'showBookIntro',
	},

	initialize: function() {
		var self = this;
		this.list = $('#list ul');
		this.intro = $('.intro');

		this.listenTo(this.collection, 'add', this.update);
		this.listenTo(this.collection, 'remove', this.update);

		this.collection.fetch();
	},

	update: function() {
		this.render();
	},

	removeBook: function(event) {
		event.preventDefault();

		var target = event.target;
		var index = $(target).index();

		var model = this.collection.at(index);
		this.collection.remove(model);	
		model.destory();	
	},

	showBookIntro: function(event) {
		var self = this;
		var target = event.target;
		var index = $(target).index();

		var model = this.collection.at(index);
		this.intro.html( self.introTpl( {
			model: model.toJSON()
		}));
	},

	render: function() {
		var self = this;
		this.list.html( self.listTpl( {
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