import React from 'react';
import ConfigPanel from './ConfigPanel.jsx';
import Grid from './Grid.jsx';

function newTile() {
    return {
        hasMine: false,
        marked: false,
        exposed: false,
        minesAround: 0
    };
}

function newGrid(r, c) {
    return Array(r).fill(Array(c).fill(newTile()));
}

function randomMines(grid, mines) {
    const row = grid.length;
    const col = grid[0].length;

    while (mines-- > 0) {
        const r = Math.floor(Math.random() * row);
        const c = Math.floor(Math.random() * col);
        grid[r][c].hasMine || (grid[r][c].hasMine = true);
        addMinesAround(grid, r, c);
    }
}

function addMinesAround(grid, r, c) {
    grid[r - 1] && grid[r - 1][c - 1] && grid[r - 1][c - 1].minesAround++;
    grid[r - 1] && grid[r - 1][c] && grid[r - 1][c].minesAround++;
    grid[r - 1] && grid[r - 1][c + 1] && grid[r - 1][c + 1].minesAround++;
    grid[r] && grid[r][c - 1] && grid[r][c - 1].minesAround++;
    grid[r] && grid[r][c + 1] && grid[r][c + 1].minesAround++;
    grid[r + 1] && grid[r + 1][c - 1] && grid[r + 1][c - 1].minesAround++;
    grid[r + 1] && grid[r + 1][c] && grid[r + 1][c].minesAround++;
    grid[r + 1] && grid[r + 1][c + 1] && grid[r + 1][c + 1].minesAround++;
}

class Game extends React.Component {

    constructor(props) {
        super(props);

        const current = 0
        const r = props.levels[current].gridRow;
        const c = props.levels[current].gridCol;
        let grid = newGrid(r, c);
        randomMines(grid);


        this.state = {
            current: current,
            row: r,
            col: c,
            grid: grid
        };
    }

    handleLevelChange (levelIndex) {
        const r = this.props.levels[levelIndex].gridRow;
        const c = this.props.levels[levelIndex].gridCol;
        const mines = this.props.levels[levelIndex].mines;
        const grid = newGrid(r, c);
        randomMines(grid, mines);


        this.setState({
            current: levelIndex,
            row: r,
            col: c,
            grid: grid
        });
    }

    handleTileClick (event, r, c) {
        
    }

    render() {
        return (
            <div className="gameContainer">
                <ConfigPanel 
                    levels={this.props.levels} 
                    levelChange={(event) => this.handleLevelChange(event)}  
                />
                <Grid 
                    grid={this.state.grid}
                    onClick={() => this.handleTileClick()}
                /> 
            </div>
        );
    }
}

export default Game