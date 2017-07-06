import React from 'react';
import {levels, emoji} from '../constants';
import ConfigPanel from './ConfigPanel.jsx';
import Timer from './Timer.jsx';
import MineCounter from './MineCounter.jsx';
import Grid from './Grid.jsx';

const defaultProps = {
    levels: levels
};

export default class Game extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            levelIndex: 0,
            status: 'playing'
        };

        this.gameOver = this.gameOver.bind(this);
        this.minesCleared = this.minesCleared.bind(this);
        this.levelChanged = this.levelChanged.bind(this);
        this.resetGame = this.resetGame.bind(this);
        //this.executeCommand = this.executeCommand.bind(this);
    }

    levelChanged (levelIndex) {
        this.setState({
            status: 'playing',
            levelIndex: levelIndex
        });
    }

    gameOver () {
        this.setState({
            status: 'gameOver'
        });
    }

    minesCleared () {
        this.setState({
            status: 'win'
        });
    }

    resetGame () {
        this.setState({
            status: 'playing'
        });
    }

    toggleFlag (add) {
        if (add) {
            this.counter.innerHTML
        } else {
            this.refs.counter.removeFlag();
        }
    }

    /*executeCommand(cmd) {
        switch (cmd) {
            case 'cleared':
                this.minesCleared();
                break;
            case 'boom':
                this.gameOver();
                break;
            case 'mark':
                this.setState({
                    flags: this.state.flags + 1
                });
                break;
            case 'unmark':
                this.setState({
                    flags: this.state.flags - 1
                });
                break;
            default:
                break;
        }
    }*/

    render () {
        const current = this.props.levels[this.state.levelIndex];

        console.log('render game');

        return (
            <div id="game-container">
                <ConfigPanel levels={levels} levelIndex={this.state.levelIndex} levelChanged={this.levelChanged}/>
                <div className="game">
                    <div className="info-bar">
                        <Timer status={this.state.status} />
                        <div className="reset">
                            <button className="reset-button" onClick={this.resetGame}>
                                {emoji[this.state.status]}
                            </button>
                        </div>
                        <div className="mines-counter" ref={(el) => { this.counter = div; }}></div>;
                        <MineCounter ref={'counter'} mines={current.mines}/>
                    </div>
                    <Grid 
                        ref={'grid'}
                        row={current.gridRow}
                        col={current.gridCol}
                        mines={current.mines}
                        toggleFlag={this.toggleFlag}
                        executeCommand={this.executeCommand}
                    />
                </div>
                <footer id="footer">
                    <p></p>
                </footer>
            </div>
        );
    }
}

Game.defaultProps = defaultProps;