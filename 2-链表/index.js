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
    return node && (node.val !== null) ? node.val : -1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    if (this.val === null) {
        this.val = val;
    } else {
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
        let prev = this.getNode(index - 1);
        if (prev) {
            let cur = new MyLinkedList(val, prev.next);
            prev.next = cur;
        }
    } else {
        let next = new MyLinkedList(this.val, this.next);
        this.val = val;
        this.next = next;
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
        if (cur.next) {
            prev = cur;
            cur = cur.next;
        } else {
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
