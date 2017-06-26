import React from 'react';
import ReactDOM from 'react-dom';
import normalized from './styles/normalize.css';
import styles from './styles/main.css';
import Game from './components/Game.jsx';

const LEVELS = [{
        index: 0,
        value: 'beginner',
        name: 'Beginner',
        mines: 10,
        gridRow: 9,
        gridCol: 9
    },
    {
        index: 1,
        value: 'intermediate',
        name: 'Intermediate',
        mines: 40,
        gridRow: 16,
        gridCol: 16,
    },
    {
        index: 2,
        value: 'expert',
        name: 'Expert',
        mines: 99,
        gridRow: 16,
        gridCol: 30
    }
];

ReactDOM.render(
    <Game levels={LEVELS}/>,
    document.getElementById('game')
);

