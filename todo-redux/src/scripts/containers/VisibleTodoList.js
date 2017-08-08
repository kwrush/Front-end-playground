import {connect} from 'react-redux';
import {VisibilityFilters} from '../constants';
import {toggleTodo} from '../actions/actions';
import TodoList from '../components/TodoList';

const {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} = VisibilityFilters;

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case SHOW_ALL:
            return todos;
        case SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps, 
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList;