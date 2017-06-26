import React from 'react';

function Tile (props) {

    const value = props.value;
    let name = 'tile col';
    let content = '';

    if (value.exposed) {
        if (value.hasMine) {
            name += ' tile-mine';
            content += '\u1f4a3';

        } else if (value.bombsAround >= 0) {
            name += (' tile-' + value.bombsAround);
            content += (value.bombsAounrd === 0 ? '' : value.bombsAround);
        }
    } else if (value.marked) {
        content += '\u1f6a9';
    }

    return (
        <div className={name} onClick={() => props.onClick()}>
            {content}
        </div>
    );
}

class Grid extends React.Component {
    renderTile (r, c, keys) {
        const index = r * this.props.grid[r].length + c;
        return  (
            <Tile
                key={index}
                value={this.props.grid[r][c]}
                onClick={() => this.props.onClick()}
            />
        );
    }

    renderGridRow (row, r, keys) {
        return (
            <div className="row" key={r}>
                {
                    row.map((tile, c) => {
                        return this.renderTile(r, c, keys)
                    })
                }
            </div>
        );
    }

    render () {
        const gr = this.props.grid.length;
        const gc = this.props.grid[0].length;
        let counter = 0;
        let keys = Array(gr * gc).fill(0).map(n => n + counter++);

        return (
            <div className='grid'>
                {
                    this.props.grid.map((row, r) => {
                        return this.renderGridRow(row, r, keys)
                    })
                }
            </div>
        );
    }
}

export default Grid