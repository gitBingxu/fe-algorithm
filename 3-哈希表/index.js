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


/**
 * 202. 快乐数 https://leetcode-cn.com/problems/happy-number/
 * 哈希表
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    function getNext(n) {
        return Array.from(`${n}`).map(i => Math.pow(i, 2)).reduce((a, b) => a + b);
    }
    let set = new Set();
    while (!set.has(n) && n !== 1) {
        // 题目提到，如果不是快乐数，势必造成无限循环
        // 那么我们只需要判断计算过程中是否产生重复数值即可
        set.add(n);
        n = getNext(n);
    }
    return n === 1;
};
// 快慢指针
var isHappy = function(n) {
    function getNext(n) {
        return Array.from(`${n}`).map(i => Math.pow(i, 2)).reduce((a, b) => a + b);
    }
    let slow = fast = n;
    do {
        // 利用循环链表的思路，使用快慢指针来判断是否有重复
        fast = getNext(getNext(fast));
        slow = getNext(slow);
    } while (fast != 1 && slow != fast)
    return fast === 1;
};


/**
 * 1. 两数之和 https://leetcode-cn.com/problems/two-sum/
 * 暴力法，时间复杂度O(n²)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const res = [], len = nums.length;
    outer: for (let outer = 0; outer < len - 1; outer++) {
        // 暴力法，两层循环
        for (let inner = outer + 1; inner < len; inner++) {
            if ((nums[outer] + nums[inner]) === target) {
                res.push(outer, inner);
                break outer;
            }
        }
    }
    return res;
};
// 空间换时间，利用hashMap的直接访问干掉array的遍历，时间复杂度O(2n)
var twoSum = function(nums, target) {
    const res = [], map = {};
    for (let i = nums.length - 1; i > -1; i--) {
        map[nums[i]] = i;
    }
    for (let i = 0; i < nums.length; i++) {
        if (map[target - nums[i]] !== undefined && map[target - nums[i]] !== i) {
            res.push(i, map[target - nums[i]]);
            break;
        }
    }
    return res;
};


/**
 * 454. 四数相加② https://leetcode-cn.com/problems/4sum-ii/submissions/
 * 利用hashMap统计次数，时间复杂度O(n²)
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    let res = 0;
    const map = {};
    for (let i = 0, outer; (outer = nums1[i]) || outer !== undefined; i++) {
        for (let j = 0, inner; (inner = nums2[j]) || inner !== undefined; j++) {
            let sum = outer + inner;
            // 统计nums1和nums2两数组单项之和的次数
            map[sum] ? map[sum] += 1 : map[sum] = 1;
        }
    }
    for (let i = 0, outer; (outer = nums3[i]) || outer !== undefined; i++) {
        for (let j = 0, inner; (inner = nums4[j]) || inner !== undefined; j++) {
            let sum = outer + inner;
            // 如果map中存在nums3和nums4两数之和的相反数，那么统计相反数出现的次数
            map[-sum] && (res += map[-sum]);
        }
    }
    return res;
};


/**
 * 383. 赎金信 https://leetcode-cn.com/problems/ransom-note/
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    const map = {};
    let res = true;
    for (let key of magazine) {
        map[key] ? map[key] += 1 : map[key] = 1;
    }
    for (let key of ransomNote) {
        if (map[key]) {
            map[key] -= 1;
        } else {
            res = false;
            break;
        }
    }
    return res;
};

