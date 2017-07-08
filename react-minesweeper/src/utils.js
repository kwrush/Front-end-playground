export function within2dArray (arr, r, c) {
    if (r < 0 || c < 0) return false;

    if (typeof arr === undefined || 
        !Array.isArray(arr)      || 
        arr.length === 0         || 
        !Array.isArray(arr[0])   ||
        arr[0].length === 0) return false;

    if (r >= arr.length || c >= arr[0].length) return false;   

    return true;
}

export function newTile (r, c) {
    return {
        row: r,
        col: c,
        hasMine: false,
        marked: false,
        exposed: false,
        minesAround: 0
    };
}

export function newGrid (r, c) {
    let grid = [];
    for (let i = 0; i < r; i++) {
        grid.push([]);
        for (let j = 0; j < c; j++) {
            grid[i].push(newTile());
        }
    }

    return grid;
}

