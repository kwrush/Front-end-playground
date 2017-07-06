import React from 'react';
import Row from './Row';
import Tile from './Tile';

function newTile (r, c) {
    return {
        row: r,
        col: c,
        hasMine: false,
        marked: false,
        exposed: false
    };
}

function newGrid (r, c) {
    let _grid = [];
    for (let i = 0; i < r; i++) {
        _grid.push([]);
        for (let j = 0; j < c; j++) {
            _grid[i].push(this.newTile());
        }
    }

    return _grid;
}

export default class Grid {
    constructor (props) {
        super(props);

        const r = this.props.row;
        const c = this.props.col;
        const _grid = this.randomMines(this.newGrid(r, c), this.props.mines);

        this.state = {
            grid: _grid
        };

        
    }

    randomMines (grid, mines) {
        let counter = mines;

        while (counter-- > 0) {
            const r = Math.floor(Math.random() * this.props.row);
            const c = Math.floor(Math.random() * this.props.col);


        }  
    }

    calcMinesInAdjacentTiles () {

    }
    
    render () {
        return (
            
        );
    }
}