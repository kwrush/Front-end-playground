export function within2DArray (arr, r, c) {
    if (r < 0 || c < 0) return false;

    if (typeof arr === undefined || 
        !Array.isArray(arr)      || 
        arr.length === 0         || 
        !Array.isArray(arr[0])   ||
        arr[0].length === 0) return false;

    if (r >= arr.length || c >= arr[0].length) return false;   

    return  true;
}

export function plainArray (r, c) {
    let counter = 0;
    return Array(r * c).fill(0).map(n => n + counter++);
}

export function clone (obj) {
    return JSON.parse(JSON.stringify(obj));
}