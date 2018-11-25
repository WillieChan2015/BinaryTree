/*
 * @Author: Mr.Chen
 * @Date: 2018-11-24 13:51:41
 * @LastEditors: Mr.Chen
 * @LastEditTime: 2018-11-25 20:08:27
 * @Description: 二叉树(JS实现)，打算修改成ES6用法，未修改完成
 */
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this._root = null;
  }

  insert(key) {
    let newNode = new Node(key);

    if (!this._root) {
      this._root = newNode;
    }
  }
}
