var Todo = Backbone.Model.extend({

	defaults: {
		completed: false
	},

	validate: function(attribs) {
		if (attribs.title === undefined) {
			return 'Remeber to set a title for your todo.';
		}
	},

	initialize: function() {
		console.log('This model has been initialized.');
		this
		.on('change:title', function() {
			console.log('Title for this model has been changed.');
		})
		.on('change:completed', function() {
			console.log('Completed for this model has been changed.');
		});
	},

	setTitle: function(newTitle) {
		this.set({title: newTitle});
	},

	setCompleted: function(status) {
		this.set({completed: status});
	}
});

var myTodo = new Todo();

myTodo.set('completed', true, {validate: true});

console.log('Completed: ' + myTodo.get('title'));

/*console.log('Title: ' + myTodo.get('title') + '\n' + 'Completed: ' + myTodo.get('completed'));

myTodo.setTitle('Changed todo title');
console.log('Title: ' + myTodo.get('title') + '\n' + 'Completed: ' + myTodo.get('completed'));

myTodo.setCompleted(true);
console.log('Title: ' + myTodo.get('title') + '\n' + 'Completed: ' + myTodo.get('completed'));*/