/*
 * Collection of simple sort algorithms, such as bubble and insertion sort.
 */

/*
 * Sort the array in the ascend order by bubble sort algorithm
 * @param{number} Numeric array
 * @return{number} Sorted array
 */
export function bubbleSort(array) {
    const len = array.length;
    let swapped;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                swapped = true;
            }
        }

        if (!swapped) break;
    } 

    return array;
}

/*
 * Sort the given array in ascend order by insertion sort algorithm 
 * @param{number} Numeric array
 * @return{number} Sorted array
 */
export function insertSort(array) {
    let insertVal, currIndex;
    for (let i = 0, len = array.length; i < len; i++) {
        insertVal = array[i];
        currIndex = i;
        while(currIndex > 0 && array[currIndex - 1] > insertVal) {
            array[currIndex] = array[currIndex - 1];
            currIndex--;
        }

        array[currIndex] = insertVal;
     }

    return array;
}


/*
 * Sort the given array in ascend order by selection sort algorithm 
 * @param{number} Numeric array
 * @return{number} Sorted array
 */
export function selectionSort(array) {
    for (let i = 0, len = array.length; i < len - 1; i++) {
        let minIndex = i;
        for (var j = i + 1; j < len; j++) {
            minIndex = array[minIndex] <= array[j] ? minIndex : j;
        }

        if (i !== minIndex) {
            swap(array, i, minIndex);
        }
    }

    return array;
}

/*
 * Sort the given array in ascend order by merge sort algorithm 
 * @param{number} Numeric array
 * @return{number} Sorted array
 */
export function mergeSort(array) {
    if (array.length <= 1) return array;

    const half = Math.round(array.length / 2);
    let left = array.slice(0, half);
    let right = array.slice(half, array.length);

    left = mergeSort(left);
    right = mergeSort(right);

    return merge(left, right);
}

/*
 * Sort the given array in ascend order by quick sort algorithm 
 * @param{number} Numeric array
 * @return{number} Sorted array
 */
export function quickSort(array) {
    doQuickSort(array, 0, array.length - 1);
    return array;
}

function doQuickSort(array, left, right) {
    if (left >= right) return;
    let pivot = array[right];
    let partitionIndex = partition(array, left, right, pivot);

    doQuickSort(array, left, partitionIndex - 1);
    doQuickSort(array, partitionIndex + 1, right);
}

function partition(array, left, right, pivot) {
    let leftIndex = left;
    let rightIndex = right - 1;

    while (true) {
        while (array[leftIndex] < pivot) {
            leftIndex++;
        }

        while (rightIndex > 0 && array[rightIndex] > pivot) {
            rightIndex--;
        }

        if (leftIndex >= rightIndex) break;

        swap(array, leftIndex, rightIndex);
    }
    
    swap(array, leftIndex, right);
    return leftIndex;
}


// Merge left and right array in ascend order
function merge(left, right) {
    let combined = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            combined.push(left[0]);
            left.shift();
        } else {
            combined.push(right[0]);
            right.shift();
        }
    }

    while (left.length) {
        combined.push(left.shift());
    }

    while (right.length) {
        combined.push(right.shift());
    }

    return combined;
}

// Sway the values at index i and j
function swap(array, i, j) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}