### 一. 二维数组中的查找
#### 题目描述
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

#### 思路
##### 1. 暴力法
暴力法没啥说的, 遍历二维数组, 找就完事了

##### 2. 圈定法
因为该矩阵无论是横向还是纵向都是递增的, 所以我们可以比较每一行的首尾与`target`, 每一列的首尾与`target`, 这样可以圈定一个范围, 然后在递归调用该方法, 并传入上次圈定的范围, 就可以找到目标值了.
```
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    // lh, rh分别是横向的左右临界点, tv; bv为纵向的临界点
    function check (lH, rH, tV, bV) {
        if (rH >= lH && bV >= tV) {
            let startH, endH, startV, endV;
            for (let i = lH; i <= rH; i++) {
                // 先确定新范围的左右临界点
                if (matrix[tV][i] <= target && matrix[bV][i] >= target) {
                    // 如果发现边界就是target的话, 就不需要再往下找了
                    if (matrix[tV][i] === target || matrix[bV][i] === target) return true;
                    if (startH === undefined) {
                        // 第一个符合条件的是左临界点
                        startH = i;
                    }
                    // 每找到一个新的临界点都是右临界点
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
            // 当最终确定的数值与target相等时返回true, 否则进入下一轮循环
            return matrix[startV] && (matrix[startV][startH] === target) ? true : check(startH, endH, startV, endV);
        } else {
            return false;
        }
    }
    // 如果传入的不是二维数组, 那么转为二维数组
    if (!Array.isArray(matrix[0])) matrix = [matrix];
    return check(0, matrix[0].length - 1, 0, matrix.length - 1);
};
```
##### 3. 二叉搜索法
从矩阵的右上角或者左下角出发, 我们这里选择的是从右上角出发, 然后比较右上角的值和`target`的大小, 从而决定是左移还是下移.
```
/**
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
    if (!Array.isArray(matrix[0])) matrix = [matrix];
    return check(0, matrix[0].length - 1);
};
```