#### 一. 二维数组中的查找
##### 题目描述
[题目链接](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof)在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。示例:
```
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
```
给定`target = 5`, 返回`true`.
给定`target = 33`, 返回`false`.

##### 二. 思路
1. 暴力法
##### 三. 代码
```
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    function check (lH, rH, tV, bV) {
        if (rH >= lH && bV >= tV) {
            let startH, endH, startV, endV;
            for (let i = lH; i <= rH; i++) {
                if (matrix[tV][i] <= target && matrix[bV][i] >= target) {
                    if (matrix[tV][i] === target || matrix[bV][i] === target) return true;
                    if (startH === undefined) {
                        startH = i;
                    }
                    endH = i;
                }
            }
            for (let i = tV; i <= bV; i++) {
                if (matrix[i][lH] <= target && matrix[i][rH] >= target) {
                    if (matrix[i][lH] === target || matrix[i][rH] === target) return true;
                    if (startV === undefined) {
                        startV = i;
                    }
                    endV = i;
                }
            }
            return +startH === endH && +startV === endV && matrix[startV][startH] === target ? true : check(startH, endH, startV, endV);
        } else {
            return false;
        }
    }
    if (!Array.isArray(matrix[0])) matrix = [matrix];
    return check(0, matrix[0].length - 1, 0, matrix.length - 1);
};
```