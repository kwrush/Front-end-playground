import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions/actions';

let AddTodo = (props) => {
    const {dispatch} = props;
    let input = null;

    return (
        <div>
            <form
                onSubmit={evt => {
                    evt.preventDefault();
                    if (!input.value.trim()) {
                        return;
                    }
                    dispatch(addTodo(input.value))
                    input.value = '';
                }}
            >
                <input 
                    type="text" 
                    ref={node => input = node}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}

AddTodo = connect()(AddTodo);

export default AddTodo