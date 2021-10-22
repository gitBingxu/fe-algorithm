/*
 * @Author: Bing Xu
 * @Date: 2021-10-21 16:46:29
 * @LastEditTime: 2021-10-22 14:51:43
 * @LastEditors: Bing Xu
 * @Description: 链表相关题解
 * @FilePath: /fe-algorithm/2-链表/index.js
 * The true nobility should be better than the past itself
 */

// 203. 移除链表元素 https://leetcode-cn.com/problems/remove-linked-list-elements/submissions/
/**
 * 用好虚头节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
 var removeElements = function(head, val) {
    const newHead = new ListNode(0, head);
    let cur = newHead;
    while (cur) {
        let next = cur.next;
        while (next && next.val === val) {
            next = next.next;
        }
        cur.next = next;
        cur = cur.next;
    }
    return newHead.next;
};