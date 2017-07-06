import React, {Component} from 'react';
import {levels, emoji} from '../constants';
import Levels from './Levels';
import Grid from './Grid';
//import Board from './Board.jsx';

const defaultProps = {
    levels: levels,
    initialLevel: Object.keys(levels)[0]
}

export default class Game extends Component {
    constructor (props) {
        super(props);

        const inLevel = this.props.levels[this.props.initialLevel];
        this.state = {
            timePassed: 0,
            current: this.props.initialLevel,
            flags: 0,
            minesLeft: inLevel.mines,
            status: 'playing'
        }

        this.levelChangeHandler = this.levelChangeHandler.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    componentDidMount () {
        this.startTimer();
    }

    componentWillUnMount () {
        this.stopTimer();
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.state.status === 'playing' && this.timer === null) {
            this.startTimer();
        }
    }

    levelChangeHandler (value) {
        this.stopTimer();
        this.setState({
            timePassed: 0,
            current: this.props.levels[value]
        });
    }

    startTimer () {
        this.timer = window.setInterval(() => {
            this.setState({
                timePassed: this.state.timePassed + 1
            });
        }, 1000);
    }

    stopTimer () {
        window.clearInterval(this.timer);
        this.timer = null;
    }

    gameOver () {
        this.stopTimer();
        this.setState({
            status: 'gameOver'
        });
    }

    win () {
        this.stopTimer();
        this.setState({
            status: 'win'
        });
    }

    toggleFlag (enable) {
        const update = enable ? 1 : -1
        this.setState({
            flag: update
        });
    }

    render () {

        const inLevel = this.props.levels[this.state.current];
        const row = inLevel.gridRow;
        const col = inLevel.gridCol;
        const mines = inLevel.mines;

        return (
            <div className="game">
                <Levels levels={this.props.levels} value={this.state.current} onChange={this.levelChangeHandler}/>
                <div className="game-board">
                    <div className="ctrl-bar">
                        <div className="timer">{this.state.timePassed}</div>
                        <div className="reset">
                            <button id="reset-button">{emoji[this.state.status]}</button>
                        </div>
                        <div className="counter"></div>
                    </div>
                    <Grid 
                        row={row}
                        col={col}
                        mines={mines}
                        gameOver={this.gameOver}
                        win={this.win}
                        toggleFlag={this.toggleFlag}
                    />
                </div>
            </div>
        );
    }
}

Game.defaultProps = defaultProps;