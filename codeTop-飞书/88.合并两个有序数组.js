/*
 * @Author: Bing Xu
 * @Date: 2021-12-04 15:57:15
 * @LastEditTime: 2021-12-04 16:14:48
 * @LastEditors: Bing Xu
 * @Description: 
 * @FilePath: /fe-algorithm/codeTop-飞书/88.合并两个有序数组.js
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
    let [p1, p2] = [m - 1, n - 1];

    for (let point = m + n - 1; point > -1; point--) {
        // 从目标数组的最后开始往前遍历
        if (p1 >= 0 && p2 >= 0) {
            // 如果两个子数组都还没有用完
            let data1 = nums1[p1], data2 = nums2[p2];
            if (data1 >= data2) {
                nums1[point] = data1;
                p1 -= 1;
            } else {
                nums1[point] = data2;
                p2 -= 1;
            }
        } else if (p1 >= 0) {
            // 当nums2已经用完了
            nums1[point] = nums1[p1--];
        } else {
            // 当nums1已经用完了
            nums1[point] = nums2[p2--];
        }
    }
};