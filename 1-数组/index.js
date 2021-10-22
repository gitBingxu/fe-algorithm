/*
 * @Author: Bing Xu
 * @Date: 2021-10-15 11:11:49
 * @LastEditTime: 2021-10-21 16:41:26
 * @LastEditors: Bing Xu
 * @Description: 数组相关算法
 * @FilePath: /fe-algorithm/1-数组/index.js
 * The true nobility should be better than the past itself
 */


// 704.二分查找 https://leetcode-cn.com/problems/binary-search/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let res = -1,
        l = 0,
        r = nums.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2),
            midVal = nums[mid];
        if (midVal === target) {
            res = mid;
            break;
        } else if (midVal < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return res;
};

// 27.移除元素 https://leetcode-cn.com/problems/remove-element/ 
/**
 * 暴力法
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for (let i = nums.length - 1; i > -1; i--) {
        if (nums[i] === val) {
            nums.splice(i, 1);
        }
    }
    return nums.length;
};
/**
 * 双指针
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let [slow, fast] = [0, 0];
    while (fast < nums.length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow += 1;
        }
        fast += 1;
    }
    return slow;
};

// 977.有序数组的平方 https://leetcode-cn.com/problems/squares-of-a-sorted-array/
/**
 * 双指针法, 从两头往中间逼近, 如果是暴力法的话, 可以直接平方后排序
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let [l, r] = [0, nums.length - 1];
    const res = new Array(nums.length);
    let index = r;
    while (l <= r) {
        let lVal = Math.pow(nums[l], 2),
            rVal = Math.pow(nums[r], 2);
        if (rVal >= lVal) {
            res[index--] = rVal
            r -= 1;
        } else {
            res[index--] = lVal;
            l += 1;
        }
    }
    return res;
};

// 209.长度最小的子数组 https://leetcode-cn.com/problems/minimum-size-subarray-sum/
/**
 * 暴力法
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let res = Number.MAX_SAFE_INTEGER;
    for (let outer = 0; outer < nums.length; outer++) {
        let tmpSum = 0;
        for (let inner = outer; inner < nums.length; inner++) {
            tmpSum += nums[inner];
            if (tmpSum >= target) {
                res = Math.min(inner - outer + 1, res);
                break;
            }
        }
    }
    return res === Number.MAX_SAFE_INTEGER ? 0 : res;
};
/**
 * 滑动窗口
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    // 定义快慢指针
    let [l, r, res] = [0, 0, Number.MAX_SAFE_INTEGER];
    let sum = 0;
    // 这里注意不要把 r < nums.length 当做循环条件
    while (l <= r) {
        if (sum < target) {
            if (r > nums.length - 1) break;
            sum += nums[r++];
        } else {
            res = Math.min(r - l, res);
            sum -= nums[l++];
        }
    }
    return res === Number.MAX_SAFE_INTEGER ? 0 : res;
};


// 59.螺旋矩阵2 https://leetcode-cn.com/problems/spiral-matrix-ii/
/**
 * 消除法
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    // 生成二维数组容器
    const res = new Array(n).fill(-1).map(item => []);
    // 定义左, 上, 右, 下 四个边界
    let [left, top, right, bottom] = [0, 0, n - 1, n - 1];
    let num = 1, taregt = n * n;
    while (num <= taregt) {
        // 这里所有的for循环都会从行(列)的的头遍历到尾
        // 这样的话刚好会消除一行(列), 谓之消除法
        for (let l = left; l <= right; l++) {
            res[top][l] = num++;
        }
        // 矩阵最上方的一行被消除, 上边界下移
        top += 1;

        for (let t = top; t <= bottom; t++) {
            res[t][right] = num++;
        }
        right -= 1;

        for (let r = right; r >= left; r--) {
            res[bottom][r] = num++;
        }
        bottom -= 1;

        for (let b = bottom; b >= top; b--) {
            res[b][left] = num++;
        }
        left += 1;
    }
    return res;
};


// 剑指offer.二维数组中的查找 https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
/**
 * 二叉树搜索, O(m + n)
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
    function check (x, y) {
        if (x <= matrix.length - 1 && y >= 0) {
            // 递归必须要确定边界条件
            let val = matrix[x][y];
            if (val === target) {
                return true;
            } else if (val < target) {
                // 如果右上角的值比target小, 那么下移
                x += 1;
            } else {
                // 右上角的值比target大, 那么左移
                y -= 1;
            }
            // 在边界内递归调用
            return check(x, y);
        } else {
            return false;
        }
    }
    // 把一维矩阵转为二维矩阵处理
    if (!Array.isArray(matrix[0])) matrix = [matrix];
    return check(0, matrix[0].length - 1);
};