/*
 * @Author: Willie Chen
 * @LastEditors: Willie Chen
 * @Date: 2021-10-19 22:20:57
 * @LastEditTime: 2021-10-20 22:54:33
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
  private root: null | BinNode;

  constructor () {
    this.root = null;
  }

  get tree () {
    return this.root;
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
    const node = new BinNode(key);
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
   * 非递归后续遍历
   * @description 要保证根结点在左孩子和右孩子访问之后才能访问，因此对于任一结点P，先将其入栈。
   * 如果P不存在左孩子和右孩子，则可以直接访问它；或者P存在左孩子或者右孩子，但是其左孩子和右孩子都已被访问过了，则同样可以直接访问该结点。
   * 若非上述两种情况，则将P的右孩子和左孩子依次入栈，这样就保证了每次取栈顶元素的时候，左孩子在右孩子前面被访问，左孩子和右孩子都在根结点前面被访问。
   */
  postOrderTraverse2 (cb: ICommonCallback) {
    if (!this.root) {
      return;
    }

    const stack: BinNode[] = [];
    let current: BinNode | null = null;
    let pre: BinNode | null = null;

    stack.push(this.root);

    while (stack.length) {
      current = stack[stack.length - 1];

      if (
        (!current.left && !current.right) || 
        (pre === current.left || pre === current.right)
      ) {
        cb(current.key);
        pre = current;
        stack.pop();
      } else {
        if (current.right) {
          stack.push(current.right);
        }
        if (current.left) {
          stack.push(current.left);
        }
      }
    }
  }

  /**
   * 查找最小节点值
   */
  get min () {
    if (!this.root) {
      return null;
    }

    let node = this.root;
    while (node && node.left) {
      node = node.left;
    }
    return node.key;
  }

  /**
   * 查找最大节点值
   */
  get max () {
    if (!this.root) {
      return null;
    }

    let node = this.root;
    while (node && node.right) {
      node = node.right;
    }
    return node.key;
  }

  /**
   * 层次遍历
   * @description 建立一个队列，先将根节点入队，然后将队首出队，然后判断它的左右子树是否为空，不为空，则先将左子树入队，然后右子树入队。
   */
  levelTraverseNode (cb: ICommonCallback) {
    if (!this.root) {
      return;
    }

    const queue: BinNode[] = [this.root];
    while (queue.length) {
      const node = queue.shift()!;
      cb(node.key);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  /**
   * 深度遍历
   */
  deepTraverseNode (cb: ICommonCallback) {
    this.preOrderTraverse2(cb);
  }

  /**
   * 查找节点
   */
  search (key: number) {
    let node = this.root;
    while (node) {
      if (node.key === key) {
        return true;
      }

      node = key > node.key ? node.right : node.left;
    }
    return false;
  }
}

const tree = new BinTree();
[20, 15, 25, 10, 16, 23, 14, 13].forEach(key => tree.insert(key));
const log = console.log.bind(console);
log(tree.search(10), tree.search(11));
log(tree.max, tree.min);