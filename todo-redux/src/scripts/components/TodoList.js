import React from 'react';
import PropTypes from 'prop-types'
import Todo from './Todo';

const TodoList = (props) => {
    const {todos, onTodoClick} = props;
    
    return (
        <ul>
            {todos.map((todo) => {
                return <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
            })}
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList