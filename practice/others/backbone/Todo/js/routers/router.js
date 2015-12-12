var app = app || {};

var Workspace = Backbone.Router.extend({
	routers: {
		'*filter': 'setFilter'
	},

	setFilter: function(param) {
		if (param) {
			param = param.trim();
		}

		app.TodoFilter = param || '';

		app.Todos.trigger('filter');
	}
});

app.TodoRouter = new Workspace();
Backbone.history.start();