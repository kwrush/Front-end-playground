import React from 'react';
import ReactDOM from 'react-dom';
import normalized from './styles/normalize.css';
import styles from './styles/main.css';
import Game from './components/Game';

ReactDOM.render(
    <Game />,
    document.getElementById('game')
);

