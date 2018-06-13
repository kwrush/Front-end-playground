import {kmpSearch} from '../src/kmp_search.js';

describe('KMP substring search', () => {
    
    it('should return an object has values of 2 and [2, 8].', () => {
        let pattern = 'abc';
        let text = 'ababcabdabcxab';
        
        expect(kmpSearch(pattern, text)).toEqual(jasmine.objectContaining(
            {
                times: 2,
                indices: [2, 8]
            }
        ));
    });

    it('should return an object has values of 1 and [7].', () => {
        let pattern = 'aa';
        let text = 'abaxabdaacxab';
        
        expect(kmpSearch(pattern, text)).toEqual(jasmine.objectContaining(
            {
                times: 1,
                indices: [7]
            }
        ));
    });

    it('should return an object has values of 0 and [].', () => {
        let pattern = 'aa';
        let text = 'ababcabdabcxab';
        
        expect(kmpSearch(pattern, text)).toEqual(jasmine.objectContaining(
            {
                times: 0,
                indices: []
            }
        ));
    });

    it('should return an object has values of 3 and [5, 8, 12].', () => {
        let pattern = 'aac';
        let text = 'caabdaacaacxaac';
        
        expect(kmpSearch(pattern, text)).toEqual(jasmine.objectContaining(
            {
                times: 3,
                indices: [5, 8, 12]
            }
        ));
    });
});