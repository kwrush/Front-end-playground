import {
    bubbleSort, 
    insertSort,
    selectionSort,
    mergeSort,
    quickSort
} from '../src/simple_sort.js';

describe('Bubble sort', () => {
    
    it ('should sort the array in ascend order', () => {
        let array = [1, 9, 4, 2, 0, 5, 6, 8, 7, 3];
        let expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(bubbleSort(array)).toEqual(expected);
    });

    it ('should return the same array', () => {
        let array = [1, 8, 9];
        let expected = [1, 8, 9];
        expect(bubbleSort(array)).toEqual(expected);
    });

    it ('should return the same number', () => {
        let array = [9];
        let expected = [9];
        expect(bubbleSort(array)).toEqual(expected);
    });
});

describe('Insertion sort', () => {
    it ('should sort the array in ascend order', () => {
        let array = [1, 9, 4, 2, 0, 5, 6, 8, 7, 3];
        let expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(insertSort(array)).toEqual(expected);
    });

    it ('should return the same array', () => {
        let array = [1, 8, 9];
        let expected = [1, 8, 9];
        expect(insertSort(array)).toEqual(expected);
    });

    it ('should return the same number', () => {
        let array = [9];
        let expected = [9];
        expect(insertSort(array)).toEqual(expected);
    });
});

describe('Selection sort', () => {
    it ('should sort the array in ascend order', () => {
        let array = [1, 9, 4, 2, 0, 5, 6, 8, 7, 3, 10];
        let expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(selectionSort(array)).toEqual(expected);
    });

    it ('should sort the array in ascend order', () => {
        let array = [1, 9, 4, 2, 0, 5, 6, 8, 7, 3, 10, 3];
        let expected = [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(selectionSort(array)).toEqual(expected);
    });

    it ('should return the same array', () => {
        let array = [1, 8, 9];
        let expected = [1, 8, 9];
        expect(selectionSort(array)).toEqual(expected);
    });
});

describe('Merge sort', () => {
    it ('should sort the array in ascend order', () => {
        let array = [2, 8, 4, 2, 0, 5, 6, 8, 7, 3, 10];
        let expected = [0, 2, 2, 3, 4, 5, 6, 7, 8, 8, 10];
        expect(mergeSort(array)).toEqual(expected);
    });

    it ('should sort the array in ascend order', () => {
        let array = [1, 9, 4, 2, 0, 5, 6, 8, 7, 3, 10, 3];
        let expected = [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(mergeSort(array)).toEqual(expected);
    });

    it ('should return the same array', () => {
        let array = [1, 8, 9];
        let expected = [1, 8, 9];
        expect(mergeSort(array)).toEqual(expected);
    });

    it ('should return the same array', () => {
        let array = [8];
        let expected = [8];
        expect(mergeSort(array)).toEqual(expected);
    });

    it ('should return a empty array', () => {
        let array = [];
        let expected = [];
        expect(mergeSort(array)).toEqual(expected);
    });
});

describe('Quick sort', () => {
    it ('should sort the array in ascend order', () => {
        let array = [2, 8, 4, 2, 0, 5, 6, 8, 7, 3, 10];
        let expected = [0, 2, 2, 3, 4, 5, 6, 7, 8, 8, 10];
        expect(quickSort(array)).toEqual(expected);
    });

    it ('should sort the array in ascend order', () => {
        let array = [1, 9, 4, 2, 0, 5, 6, 8, 7, 3, 10, 3];
        let expected = [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(quickSort(array)).toEqual(expected);
    });

    // it ('should return the same array', () => {
    //     let array = [1, 8, 9];
    //     let expected = [1, 8, 9];
    //     expect(quickSort(array)).toEqual(expected);
    // });

    // it ('should return the same array', () => {
    //     let array = [8];
    //     let expected = [8];
    //     expect(quickSort(array)).toEqual(expected);
    // });

    // it ('should return a empty array', () => {
    //     let array = [];
    //     let expected = [];
    //     expect(quickSort(array)).toEqual(expected);
    // });
});