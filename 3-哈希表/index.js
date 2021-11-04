/*
 * @Author: Bing Xu
 * @Date: 2021-10-21 16:46:29
 * @LastEditTime: 2021-10-22 14:51:43
 * @LastEditors: Bing Xu
 * @Description: 链表相关题解
 * @FilePath: /fe-algorithm/3-哈希表/index.js
 * The true nobility should be better than the past itself
 */

/**
 * 242. 有效的字母异位词 https://leetcode-cn.com/problems/valid-anagram/submissions/
 * 只在一个map上操作
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    let map = {},
        res = true;
    if (s.length !== t.length) {
        res = false;
    } else {
        for (let i = 0; i < s.length; i++) {
            let sKey = s[i],
                tKey = t[i];
            // 字符串s中的字符占位 +1
            map[sKey] ? (map[sKey] += 1) : (map[sKey] = 1);
            // 字符串t中的字符占位 -1
            map[tKey] ? (map[tKey] -= 1) : (map[tKey] = -1);
        }
        for (let key of Object.keys(map)) {
            // 如果某个字符没有被完全抵消，那么结果为false
            if (map[key] !== 0) {
                res = false;
                break;
            }
        }
    }
    return res;
};


/**
 * 349. 两个数组的交集 https://leetcode-cn.com/problems/intersection-of-two-arrays/
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersection = function(nums1, nums2) {
    const set = new Set(nums1), res = new Set();
    for (let i = 0; i < nums2.length; i++) {
        if (set.has(nums2[i])) {
            res.add(nums2[i]);
        }
    }
    return [...res];
};



/**
 * 438. 找到字符串中所有的字母异位词 https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/submissions/
 * 暴力法 -- 超时
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const res = [], len = p.length;

    function isHeteronathon (source, target) {
        const map = {};
        let res = true;
        for (let i = 0; i < source.length; i++) {
            map[target[i]] ? (map[target[i]] += 1) : (map[target[i]] = 1);
            map[source[i]] ? (map[source[i]] -= 1) : (map[source[i]] = -1);
        }
        for (let key of Object.keys(map)) {
            if (map[key] !== 0) {
                res = false;
                break;
            }
        }
        return res;
    }

    for (let i = 0; i < s.length - len + 1; i++) {
        // 从每个索引处判断之后的字符串切片是否异位词
        if (isHeteronathon(s.slice(i, i + len), p)) {
            res.push(i);
        }
    }
    return res;
};

