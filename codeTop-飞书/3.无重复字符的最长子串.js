/*
 * @Author: Bing Xu
 * @Date: 2021-12-04 13:16:39
 * @LastEditTime: 2021-12-04 16:23:05
 * @LastEditors: Bing Xu
 * @Description: 
 * @FilePath: /fe-algorithm/codeTop-飞书/3.无重复字符的最长子串.js
 */

/**
 * @description: 暴力法求解
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let res = 0,
        set = new Set();
    for (let i = 0; i < s.length; i++) {
        set = new Set();
        for (let j = i; j < s.length; j++) {
            let key = s[j];
            if (!set.has(key)) {
                set.add(key);
                res = Math.max(res, set.size);
            } else {
                break;
            }
        }
    }
    return res;
};

// 滑动窗口（双指针）
var lengthOfLongestSubstring = function(s) {
    let [slow, fast, res] = [0, 0, 0];
    const set = new Set();
    while (slow <= fast && fast < s.length) {
        let key = s[fast];
        if (set.has(key)) {
            // 如果 set 中包含了 fast 节点，那么应该从 slow 端找到这个节点
            // 并且让 slow 指向这个节点的下一个节点
            while (slow < fast) {
                let _key = s[slow++];
                if (_key === key) {
                    break;
                } else {
                    set.delete(_key);
                }
            }
        } else {
            set.add(key);
            res = Math.max(res, fast - slow + 1);
        }
        fast += 1;
    }
    return res;
};