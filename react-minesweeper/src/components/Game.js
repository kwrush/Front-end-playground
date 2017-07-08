import React from 'react';
import {levels, emoji} from '../constants';
import {within2dArray} from '../utils';
import Levels from './Levels';
import Grid from './Grid';

function Timer (props) {
    return <div className="display">{props.timePassed}</div>;
}

function MineCounter (props) {
    return <div className="display">{props.counter}</div>
}

const defaultProps = {
    levels: levels,
    initialLevel: Object.keys(levels)[0]
}

export default class Game extends React.Component {
    constructor (props) {
        super(props);

        const inLevel = this.props.levels[this.props.initialLevel];
        this.state = {
            timePassed: 0,
            current: this.props.initialLevel,
            flags: 0,
            status: 'playing'
        }

        this.levelChangeHandler = this.levelChangeHandler.bind(this);
        this.toggleFlag = this.toggleFlag.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.win = this.win.bind(this);
        this.reset = this.reset.bind(this);
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
        } else if (this.state.status === 'reset') {
            this.setState({
                status: 'playing'
            });
        }
    }

    levelChangeHandler (value) {
        this.stopTimer();
        this.setState({
            timePassed: 0,
            status: 'playing',
            current: value
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

    reset () {
        this.stopTimer();
        this.setState({
            timePassed: 0,
            status: 'reset',
            flags: 0
        });
    }

    toggleFlag (enable) {
        const update = enable ? 1 : -1
        this.setState({
            flags: this.state.flags + update
        });
    }

    render () {

        const inLevel = this.props.levels[this.state.current];
        const row = inLevel.row;
        const col = inLevel.col;
        const mines = inLevel.mines;
        const left = mines - this.state.flags;

        return (
            <div className="game-container">
                <Levels levels={this.props.levels} value={this.state.current} onChange={this.levelChangeHandler}/>
                <div className="horiz-center game-board">
                    <div className="ctrl-bar row">
                        <div className="col info">
                            <span className="info-icon">{emoji['clock']}</span>
                            <Timer timePassed={this.state.timePassed} />
                        </div>
                        <div className="col info">
                            <button id="reset-btn" className="tile" onClick={this.reset}>{emoji[this.state.status]}</button>
                        </div>
                        <div className="col info">
                            <span className="info-icon">{emoji['flag']}</span>
                            <MineCounter counter={left >= 0 ? left : 0}/>
                        </div>
                    </div>
                    <Grid 
                        row={row}
                        col={col}
                        mines={mines}
                        status={this.state.status}
                        gameOver={this.gameOver}
                        win={this.win}
                        toggleFlag={this.toggleFlag}
                    />
                </div>
                <footer id="footer">
                    <p>Click tile to expose its content, right click or <span>alt+left</span> click to mark the mine</p>
                    <p>Click emoji button {emoji['win']} to restart the game.</p>
                </footer>
            </div>
        );
    }
}

Game.defaultProps = defaultProps;