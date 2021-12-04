/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var getKthFromEnd = function(head, k) {
    const cur = head;
    // point的定义是 当fast为末节点的时候，slow为倒数第 point 个
    // 因为倒数第 0 个为倒数第一个，所以这里point为 1
    let [slow, fast, point] = [cur, cur, 1];
    
    while (fast && fast.next) {
        if (point++ >= k) {
            // 以满足题目对 point 的要求
            slow = slow.next;
        }
        fast = fast.next;
    }
    
    return slow;
};