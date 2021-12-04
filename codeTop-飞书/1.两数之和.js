/*
 * @Author: Bing Xu
 * @Date: 2021-12-04 15:18:33
 * @LastEditTime: 2021-12-04 15:19:05
 * @LastEditors: Bing Xu
 * @Description: 
 * @FilePath: /fe-algorithm/codeTop-飞书/1.两数之和.js
 */

/**
 * 利用哈希表降时间复杂度
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const res = [],
        map = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = i;
    }
    for (let i = 0; i < nums.length; i++) {
        let val = map[target - nums[i]];
        if (val !== undefined && val !== i) {
            res.push(i, val);
            break;
        }
    }
    return res;
};