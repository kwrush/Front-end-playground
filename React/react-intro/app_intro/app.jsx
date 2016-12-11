import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello.jsx';
import Clock from './clock.jsx';
import Game from './TicTacToe.jsx';

function App() {
    return (
        <div>
            <Hello name="Kai" />
            <Clock />
            <Game />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('hello'));

