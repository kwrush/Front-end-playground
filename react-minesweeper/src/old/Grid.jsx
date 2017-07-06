import React from 'react';
import {levels, keyCodes} from '../constants';
import {within2DArray, plainArray, clone} from '../utils';
import Immutable from '../../node_modules/immutable';
import Tile from './Tile.jsx';


const defaultProps = {
    row: levels[0].gridRow,
    col: levels[0].gridCol,
    mines: levels[0].mines
}

export default class Grid extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            grid: this.randomMines(this.newGrid(this.props))
        }

        this.newTile = this.newTile.bind(this);
        this.newGrid = this.newGrid.bind(this);
        this.randomMines = this.randomMines.bind(this);
        this.onTileClicked = this.onTileClicked.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderTile = this.renderTile.bind(this);
        this.expose = this.expose.bind(this);
        this.toggleMark = this.toggleMark.bind(this);
        this.calcMinesInAdjacentTiles = this.calcMinesInAdjacentTiles.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            grid: this.randomMines(this.newGrid(nextProps))
        });
    }

    randomMines (grid) {
        let mines = this.props.mines;
        while (mines-- > 0) {
            const r = Math.floor(Math.random() * this.props.row);
            const c = Math.floor(Math.random() * this.props.col);

            if (within2DArray(grid, r, c) && !grid[r][c].hasMine) {
                grid[r][c].hasMine = true;
                this.calcMinesInAdjacentTiles(grid, r - 1, c)
                    .calcMinesInAdjacentTiles(grid, r - 1, c - 1)
                    .calcMinesInAdjacentTiles(grid, r - 1, c + 1)
                    .calcMinesInAdjacentTiles(grid, r, c - 1)
                    .calcMinesInAdjacentTiles(grid, r, c + 1)
                    .calcMinesInAdjacentTiles(grid, r + 1, c)
                    .calcMinesInAdjacentTiles(grid, r + 1, c - 1)
                    .calcMinesInAdjacentTiles(grid, r + 1, c + 1);
            }
        }

        return grid;
    } 

    calcMinesInAdjacentTiles (grid, r, c) {
        if (within2DArray(grid, r, c)) {
            grid[r][c].minesAround++;
        }

        return this;
    }

    onTileClicked (event, tile) {

        if (event.button === keyCodes.RIGHT_CLICK || 
            event.button === keyCodes.CLICK && event.altKey) {
            this.toggleMark(tile);
        } else if (event.button === keyCodes.CLICK) {
            this.expose(tile);
        }

        this.setState({
            grid: _grid
        });
    }

    toggleMark (grid, r, c) {
        grid[r][c].marked = !grid[r][c].marked;
        const cmd = grid[r][c].marked ? 'mark' : 'unmark';
        this.props.executeCommand(cmd);

        this.setState({
            grid: grid
        });
    }

    expose (grid, r, c) {

        if (grid[r][c].exposed || grid[r][c].marked) return;

        if (grid[r][c].hasMine) {
            grid[r][c].exposed = true;
            this.props.executeCommand('boom');
        } else {
            this.exposeAround(grid, r, c);
        }

        this.setState({
            grid: grid
        });
    }

    exposeAround (grid, r, c) {
        if (!within2DArray(grid, r, c)) return this;

        const tile = grid[r][c];

        if (!tile.exposed && !tile.marked && !tile.hasMine) {
            tile.exposed = true;
            if (tile.minesAround === 0) {
                this.exposeAround(grid, r - 1, c)
                    .exposeAround(grid, r - 1, c + 1)
                    .exposeAround(grid, r - 1, c - 1)
                    .exposeAround(grid, r, c - 1)
                    .exposeAround(grid, r, c + 1)
                    .exposeAround(grid, r + 1, c)
                    .exposeAround(grid, r + 1, c + 1)
                    .exposeAround(grid, r + 1, c - 1);
            }
        }
 
        return this;
    }

    newTile () {
        return {
            hasMine: false,
            marked: false,
            exposed: false,
            minesAround: 0
        };
    }

    newGrid (props) {
        const r = props.row;
        const c = props.col;
        let grid = [];
        for (let i = 0; i < r; i++) {
            let row = [];
            for (let j = 0; j < c; j++) {
                row.push(this.newTile());
            }
            grid.push(row);
        }

        return grid;
    } 

    renderTile (r, c, key) {
        const tile = this.state.grid[r][c];
        return (
            <Tile 
                key={key}
                row={r}
                col={c}
                marked={tile.marked}
                minesAround={tile.minesAround}
                hasMine={tile.hasMine}
                toggleFlag={(enable) => this.props.toggleFlag(enable)}
                onTileClicked={this.onTileClicked}
            />
        );
    }

    renderRow (row, index) {
        return (
            <div className="row" key={index}>
                {
                    row.map((tile, c) => {
                        const key = index * this.props.col + c;
                        return this.renderTile(index, c, key);
                    })
                }
            </div>
        );
    }

    render () {

        const keys = plainArray(this.props.row, this.props.col);

        return (
            <div className="grid">
                {
                    this.state.grid.map((row, r) => {
                        return this.renderRow(row, r);
                    })
                }
            </div>
        );
    }
}

Grid.defaultProps = defaultProps;