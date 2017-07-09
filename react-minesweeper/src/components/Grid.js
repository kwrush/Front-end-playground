import React from 'react';
import {within2dArray, newGrid} from '../utils';
import Tile from './Tile';

/**
 * Check if the tiles around the given location have been cleared
 * @param {Array} grid grid array
 * @param {Number} r row of location
 * @param {Number} c column of location
 * @return true if all tiles are cleared
 */
function isAdjacentTilesCleared(grid, r, c) {
    const offsets = [
        [0, -1] , 
        [-1, -1],
        [-1, 0],
        [1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1]
    ];

    for (let i = 0; i < offsets.length; i++) {
        const nr = r + offsets[i][0];
        const nc = c + offsets[i][1];
        if (within2dArray(grid, nr, nc) && !grid[nr][nc].hasMine && 
            !grid[nr][nc].exposed)  {
            return false;
        }
    }

    return true;
}

/**
 * Expose tiles in the specific array
 * @param {Array} grid 
 */
function exposeAll (grid) {
    return grid.map(row => {
        return row.map(tile => {
            return Object.assign(tile, {
                exposed: true
            })
        });
    });
}

export default class Grid extends React.Component {
    constructor (props) {
        super(props);

        const r = this.props.row;
        const c = this.props.col;
        const _grid = this.randomMines(newGrid(r, c), this.props.mines);

        this.state = {
            grid: _grid
        };

        this.randomMines = this.randomMines.bind(this);
        this.exposeTile = this.exposeTile.bind(this);
        this.exposeAround = this.exposeAround.bind(this);
        this.markTile = this.markTile.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderTile = this.renderTile.bind(this);
        this.checkCanWin = this.checkCanWin.bind(this);
        this.calcMinesInAdjacentTiles = this.calcMinesInAdjacentTiles.bind(this);
    }

    componentWillReceiveProps (nextProps) {

        if (this.props.row != nextProps.row || 
            this.props.col != nextProps.col || 
            nextProps.status === 'reset')  {
            // Recreate the grid entirely either the dimension changes or
            // the game status is reset
            const r = nextProps.row;
            const c = nextProps.col;
            const _grid = this.randomMines(newGrid(r, c), nextProps.mines);
            this.setState({
                grid: _grid
            });
        } else if (nextProps.status === 'gameOver') {
            // Otherwise we epose the mines under the hood
            let _exposedGrid = exposeAll(this.state.grid);
            this.setState({
                grid: _exposedGrid
            });
        }
    }

    /**
     * Tile click handler
     * @param {Number} r 
     * @param {Number} c 
     */
    exposeTile (r, c) {
        if (this.props.status !== 'playing') return;

        let _grid = this.state.grid;

        // Game over if clicking on a mine
        if (_grid[r][c].hasMine) {
            this.props.gameOver();
        } else {
            this.exposeAround(_grid, r, c);

            if (this.checkCanWin(_grid)) {
                this.props.win();
            } else {
                this.setState({
                    grid: _grid
                });
            }
        }
    }

    /**
     * Expose the tiles with no mines around the give location
     * @param {Array} grid 
     * @param {Number} r 
     * @param {Number} c 
     * @return this Grid object
     */
    exposeAround (grid, r, c) {
        if (!within2dArray(grid, r, c)) return this;
        const tile = grid[r][c];

        if (!tile.exposed && !tile.hasMine && !tile.marked) {
            grid[r][c] = Object.assign(tile, {
                exposed: true,
                marked: false
            });

            if (grid[r][c].minesAround === 0) {
                this.exposeAround(grid, r - 1, c)
                    .exposeAround(grid, r - 1, c + 1)
                    .exposeAround(grid, r - 1, c - 1)
                    .exposeAround(grid, r, c - 1)
                    .exposeAround(grid, r, c + 1)
                    .exposeAround(grid, r + 1, c)
                    .exposeAround(grid, r + 1, c + 1)
                    .exposeAround(grid, r + 1, c - 1)
            }
        }

        return this;
    }

    /**
     * Mark the given location in the grid
     * @param {Number} r 
     * @param {Number} c 
     */
    markTile (r, c) {
        if (this.props.status !== 'playing') return;
        
        let _grid = this.state.grid;
        if (within2dArray(_grid, r, c)) {
            _grid[r][c].marked = !_grid[r][c].marked;
            this.props.toggleFlag(_grid[r][c].marked);

            if (this.checkCanWin(_grid)) {
                this.props.win();
            } else {
                this.setState({
                    grid: _grid
                });
            }
        }
    }

    /**
     * Check if we have marked all mines
     * @param {Array} grid 
     * @return true if we can win the game
     */
    checkCanWin (grid) {
        for (let i = 0; i < grid.length; i++) {
            let row = grid[i];
            for (let j = 0; j < row.length; j++) {
                let tile = row[j];
                if (tile.hasMine && !isAdjacentTilesCleared(grid, i, j) && !tile.marked) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Put mines in the random location 
     * @param {Array} grid 
     * @param {Numbers} mines 
     */
    randomMines (grid, mines) {
        let counter = mines;
        const row = grid.length;
        const col = grid[0].length;

        while (counter > 0) {
            const r = Math.floor(Math.random() * row);
            const c = Math.floor(Math.random() * col);

            if (within2dArray(grid, r, c) && !grid[r][c].hasMine) {
                grid[r][c].hasMine = true;
                this.calcMinesInAdjacentTiles(grid, r - 1, c)
                    .calcMinesInAdjacentTiles(grid, r - 1, c - 1)
                    .calcMinesInAdjacentTiles(grid, r - 1, c + 1)
                    .calcMinesInAdjacentTiles(grid, r, c - 1)
                    .calcMinesInAdjacentTiles(grid, r, c + 1)
                    .calcMinesInAdjacentTiles(grid, r + 1, c)
                    .calcMinesInAdjacentTiles(grid, r + 1, c - 1)
                    .calcMinesInAdjacentTiles(grid, r + 1, c + 1);

                counter--; 
            }
        }  

        return grid;
    }

    /**
     * Increase the minesAround property
     * @param {Array} grid 
     * @param {Number} r 
     * @param {Number} c 
     */
    calcMinesInAdjacentTiles (grid, r, c) {
        if (within2dArray(grid, r, c)) {
            grid[r][c].minesAround += 1;
        }

        return this;
    }

    renderRow (row, index) {
        return (
            <div className="row tiles-row" key={index}>
                {
                    row.map((tile, c) => {
                        const key = index * this.props.col + c;
                        return this.renderTile(index, c, key);
                    })
                }
            </div>
        );
    }

    renderTile (r, c, key) {
        return (
            <Tile
                key={key}
                row={r}
                col={c}
                tile={this.state.grid[r][c]}
                exposeTile={this.exposeTile}
                markTile={this.markTile}
            />
        );
    }
    
    render () {
        return (
            <div className="grid horiz-center">
                {
                    this.state.grid.map((row, r) => {
                        return this.renderRow(row, r);
                    })
                }
            </div>
        );
    }
}