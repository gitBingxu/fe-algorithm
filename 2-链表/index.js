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
    // 使用虚头节点会减少复杂度
    const res = new ListNode(0, head);
    let cur = res;
    while (cur.next) {
        let next = cur.next;
        if (next.val === val) {
            cur.next = next.next;
            continue;
        }
        cur = cur.next;
    }
    return res.next;
};


// 707. 设计链表 https://leetcode-cn.com/problems/design-linked-list/
var MyLinkedList = function(val, next) {
    this.val = val === undefined ? null : val; // null 表示空节点
    this.next = next || null;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    let node = this.getNode(index);
    // 这里要注意当节点的val为null的时候表示的是空节点
    return node && (node.val !== null) ? node.val : -1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    if (this.val === null) {
        // 如果头节点是空节点的话，这里直接给头结点赋值
        this.val = val;
    } else {
        // 复制一个老的头结点，然后用当前节点指向老的头结点
        let oldHead = new MyLinkedList(this.val, this.next);
        this.val = val;
        this.next = oldHead;
    }
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    const tail = this.getTail();
    if (tail.val === null) {
        // 这里同样注意尾结点是否是空节点
        this.val = val;
    } else {
        tail.next = new MyLinkedList(val);
    }
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index > 0) {
        // 如果index大于0，那么直接找到目标节点的前面的节点
        let prev = this.getNode(index - 1);
        if (prev) {
            let cur = new MyLinkedList(val, prev.next);
            prev.next = cur;
        }
    } else {
        // 如果index <= 0 那么直接在头部插入一个节点
        this.addAtHead(val);
    }
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    let cur = this;
    let prev;
    
    for (; index > 0; index--) {
        // 这里找目标节点的前一个节点
        if (cur.next) {
            prev = cur;
            cur = cur.next;
        } else {
            // 如果index范围内没有找到目标，那么证明index是无效的
            return;
        }
    }
    if (prev) {
        prev.next = prev.next.next;
    } else {
        let next = this.next;
        if (next) {
            this.next = next.next;
            this.val = next.val;
        } else {
            this.val = null;
            this.next = null;
        }
    }
};

MyLinkedList.prototype.getTail = function () {
    let res = this;
    while (res.next) {
        res = res.next;
    }
    return res;
};

MyLinkedList.prototype.getNode = function (index) {
    let res = this;
    for (; index > 0; index--) {
        if (res) {
            res = res.next;
        } else {
            res = null;
            break;
        }
    }
    return index > -1 ? res : null;
};


/**
 * 206. 翻转链表 https://leetcode-cn.com/problems/reverse-linked-list/
 * 双指针
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let [pre, cur] = [null, head]; // 这里声明pre为null是一个关键点
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
};
// 递归
var reverseList = function(head) {
    function reverse (pre, cur) {
        if (!cur) return pre;
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
        // 递归要搞清楚什么时候需要return
        return reverse(pre, cur);
    }
    return reverse(null, head);
};


/**
 * 24.两两交换链表中的节点 https://leetcode-cn.com/problems/swap-nodes-in-pairs/submissions/
 * 递归
 * @param {ListNode} head
 * @return {ListNode}
 */
 var swapPairs = function(head) {
    function swap(node) {
        // 递归要搞清楚出口
        if (node) {
            let cur = node.next;
            if (cur) {
                let next = cur.next;
                cur.next = node;
                node.next = swap(next);
                // 出口3：聊表交换完毕后返回头结点
                return cur;
            } else {
                // 出口2：链表只有1个节点
                return node;
            }
        } else {
            // 出口1：链表为空的时候
            return null;
        }
    }
    return swap(head);
};
// 双指针
var swapPairs = function(head) {
    let res = new ListNode(0, head);
    let [pre, cur] = [res, head];
    // 这里同样注意是当链表不为空并且长度大于1的时候才需要交换
    // 这里指针比较少，所以多了很多交换步骤，不建议使用
    while (cur && cur.next) {
        let next = cur.next;
        pre.next = next;
        next = next.next;
        pre.next.next = cur;
        cur.next = next;
        pre = cur;
        cur = cur.next;
    }
    return res.next;
};