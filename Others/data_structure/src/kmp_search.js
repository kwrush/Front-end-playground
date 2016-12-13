/*
 * Calculate length of the longest prefix suffix 
 * (Partial match table)
 */
function computePMT(pat) {
    const M = pat.length;
    let pmt = [0];  // first pmt is always 0
    let i = 1; 
    let k = 0;

    while (i < M) {
        if (pat.charAt(i) === pat.charAt(k)) {
            pmt.push(++k);
            i++;
        } else {
            if (k === 0) {
                pmt.push(k);
                i++;
            } else {
                k = pmt[k - 1];
            }
        }
    }

    return pmt;
}

/*
 * Return times the pattern appears in txt
 * @param {string} pattern string
 * @param {string} text to be matched
 * return {object} appearance times and first index to be matched in each appearance
 */
export function kmpSearch(pat, txt) {
    const PM = pat.length;
    const TM = txt.length;
    const pmt = computePMT(pat);  // preprocess pattern
    let times = 0;                // pattern appearance times 
    let indices = [];             // first index of the char matched
    let i = 0;                    
    let j = 0;

    while (i < TM) {
        if (pat.charAt(j) === txt.charAt(i)) {
            i++;
            j++;
            // fully matched
            j === PM && ++times && indices.push(i - j);
        } else {
            if (j !== 0) {
                j = pmt[j - 1];
            } else {
                i++;
            }
        }
    }

    return {
        times: times,
        indices: indices
    };
}
