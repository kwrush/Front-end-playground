import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
    const color = {color: props.color};
    return (
        <button className="square" onClick={() => props.onClick()} style={color}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square color={this.props.colors[i]} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                colors: Array(9).fill('#333'),
                position: null,
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const position = {
            x: i % 3,
            y: Math.round(i / 3)
        };

        this.setState({
            history: history.concat([{
                squares: squares,
                colors: Array(9).fill('#333'),
                position: position
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    highlightWinner() {

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #{' + step.position.x + ' ' +  step.position.y + '}':
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status, highlight;
        if (winner) {
            status = 'Winner: ' + winner.winner;
            winner.indices.map((index) => {
                current.colors[index] = 'red';
            });
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        colors={current.colors}
                        squares={current.squares}
                        onClick={i => this.handleClick(i)} 
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                indices: [a, b, c]
            };
        }
    }
    return null;
}

export default Game;