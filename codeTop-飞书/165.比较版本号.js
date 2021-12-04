/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    const arr1 = version1.split('.');
    const arr2 = version2.split('.');
    const len = Math.max(arr1.length, arr2.length);
    let res = 0;
    
    for (let i = 0; i < len; i++) {
        let v1 = +arr1[i] || 0,
            v2 = +arr2[i] || 0;
        if (v1 > v2) {
            res = 1;
            break;
        } else if ( v1 < v2) {
            res = -1;
            break;
        } else {
            res = 0;
        }
    }

    return res;
};