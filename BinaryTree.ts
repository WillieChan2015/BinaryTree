/*
 * @Author: Willie Chen
 * @LastEditors: Willie Chen
 * @Date: 2021-10-19 22:20:57
 * @LastEditTime: 2021-10-19 23:08:18
 * @Description: 二叉树
 */

interface ICommonCallback {
  (num: number): void;
}

class BinNode {
  public key: number;
  public left: null | BinNode;
  public right: null | BinNode;

  constructor (key: number) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinTree {
  public root: null | BinNode;

  constructor () {
    this.root = null;
  }

  /**
   * 辅助插入节点函数
   */
  private insertNode (node: BinNode, newNode: BinNode) {
    if (newNode.key < node.key) {
      if (node.left) {
        this.insertNode(node.left, newNode);
      } else {
        node.left = newNode;
      }
    } else {
      if (node.right) {
        this.insertNode(node.right, newNode);
      } else {
        node.right = newNode;
      }
    }
  }

  /**
   * 插入节点
   */
  insert (key: number) {
    // 新建 Node 的实例
    const node = new Node(key);
    // 当根节点为空时
    if (!this.root) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  }

  /**
   * 中序遍历，简单来说，是 左-根-右。
   */

  /**
   * 中序遍历辅助函数
   */
  private inOrderTraverseNode (node: BinNode | null, cb: ICommonCallback) {
    if (node) {
      this.inOrderTraverseNode(node, cb);
      cb(node.key);
      this.inOrderTraverseNode(node, cb);
    }
  }

  /**
   * 递归中序遍历
   */
  inOrderTraverse (cb: ICommonCallback) {
    this.inOrderTraverseNode(this.root, cb);
  }

  /**
   * 非递归中序遍历
   */
  inOrderTraverse2 (cb: ICommonCallback) {
    let node = this.root;

    const stack: BinNode[] = [];
    while (node || stack.length) {
      if (node) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop()!;
        cb(node.key);
        node = node.right;
      }
    }
  }

  /**
   * 先序遍历辅助函数
   */
  private preOrderTraverseNode (node: BinNode | null, cb: ICommonCallback) {
    if (node) {
      cb(node.key);
      this.preOrderTraverseNode(node.left, cb);
      this.preOrderTraverseNode(node.right, cb);
    }
  }

  /**
   * 先序遍历, 简单来说就是 根-左-右
   */

  /**
   * 递归先序遍历
   */
  preOrderTraverse (cb: ICommonCallback) {
    this.preOrderTraverseNode(this.root, cb);
  }

  /**
   * 非递归先序遍历
   */
  preOrderTraverse2 (cb: ICommonCallback) {
    let node = this.root;
    const stack: BinNode[] = [];

    while (node || stack.length) {
      if (node) {
        stack.push(node);
        cb(node.key);
        node = node.left;
      } else {
        node = stack.pop()!.right;
      }
    }
  }

  /**
   * 后序遍历简单来说就是， 左-右-根
   */

  /**
   * 后序遍历辅助函数
   */
  private postOrderTraverseNode (node: BinNode | null, cb: ICommonCallback) {
    if (node) {
      this.postOrderTraverseNode(node.left, cb);
      this.postOrderTraverseNode(node.right, cb);
      cb(node.key);
    }
  }

  /**
   * 后序遍历
   */
  postOrderTraverse (cb: ICommonCallback) {
    this.postOrderTraverseNode(this.root, cb);
  }

  /**
   * todo 非递归后续遍历
   */
}