/*
 * @Author: Mr.Chen
 * @Date: 2018-11-23 19:49:17
 * @LastEditors: Mr.Chen
 * @LastEditTime: 2018-11-25 20:44:02
 * @Description: JS实现二叉树
 */
function BinaryTree() {
  let Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  let root = null;

  const insertNode = function(node, newNode) {
    if (newNode.key < node.key) {
      if (!node.left) {
        node.left = newNode;
      }
      else {
        insertNode(node.left, newNode);
      }
    }
    else {
      if (!node.right) {
        node.right = newNode;
      }
      else {
        insertNode(node.right, newNode);
      }
    }
  };

  this.insert = function(key) {
    let newNode = new Node(key);

    if (!root) {
      root = newNode;
    }
    else {
      insertNode(root, newNode);
    }
  };

  this.getTree = function() {
    return root;
  }

  const inorderTraverseNode = function(node, callback) {
    if (node) {
      inorderTraverseNode(node.left, callback);
      callback(node.key);
      inorderTraverseNode(node.right, callback);
    }
  }
  // 非递归中序遍历
  const inorderTraverseNode2 = function(node, callback) {
    if (node) {
      let stack = [];
      while (node || stack.length) {
        if (node) {
          stack.push(node);
          node = node.left;
        }
        else {
          node = stack.pop();
          callback(node.key);
          node = node.right;
        }
      }
    }
  }

  const preorderTraverseNode = function(node, callback) {
    if (node) {
      callback(node.key);
      preorderTraverseNode(node.left, callback);
      preorderTraverseNode(node.right, callback);
    }
  }
  // 非递归先序遍历
  const preorderTraverseNode2 = function(node, callback) {
    if (node) {
      let stack = [];
      while (node || stack.length) {
        if (node) {
          stack.push(node);
          callback(node.key);
          node = node.left;
        }
        else {
          node = stack.pop();
          node = node.right;
        }
      }
    }
  }

  const postorderTraverseNode = function(node, callback) {
    if (node) {
      postorderTraverseNode(node.left, callback);
      postorderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  // 非递归后续遍历
  const postorderTraverseNode2 = function(node, callback) {
    if (node) {
      const stack = [];
      let curNode = null, preNode = null;

      stack.push(node);
      while (stack.length) {
        // curNode = null;
        curNode = stack[stack.length - 1];

        if (
          (!curNode.left && !curNode.right) ||
          (preNode === curNode.left || preNode === curNode.right)
        ) {
          callback(curNode.key);
          preNode = curNode;
          // curNode = stack.pop();
          stack.pop();
        }
        else {
          if (curNode.right) {
            stack.push(curNode.right);
          }
          if (curNode.left) {
            stack.push(curNode.left);
          }
        }
      }
    }
  }

  this.inorderTraverse = function(callBack) {
    inorderTraverseNode2(root, callBack);
  }

  this.preorderTraverse = function(callback) {
    preorderTraverseNode2(root, callback);
  }

  this.postorderTraverse = function(callback) {
    postorderTraverseNode2(root, callback);
  }

  const minNode = function(node) {
    if (node) {
      while(node && node.left) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }

  this.min = function() {
    return minNode(root);
  }

  const maxNode = function(node) {
    if (node) {
      while(node && node.right) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }

  this.max = function() {
    return maxNode(root);
  }

  const searchNode = function(node, key) {
    if (!node) {
      return false
    }

    if (key < node.key) {
      return searchNode(node.left, key);
    }
    else if (key > node.key) {
      return searchNode(node.right, key);
    }
    else {
      return true;
    }
  }

  this.search = function(key) {
    return searchNode(root, key);
  }

  const findMinNode = function(node) {
    if (node) {
      while(node && node.left) {
        node = node.left;
      }
      return node;
    }
    return null;
  }

  const removeNode = function(node, key) {
    if (!node) {
      return null;
    }

    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    }
    else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    }
    else {
      if (!node.left && !node.right) {
        node = null;
        return node;
      }
      else if (!node.left) {
        node = node.right;
        return node;
      }
      else if (!node.right) {
        node = node.left;
        return node;
      }

      let aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }
  }

  this.remove = function(key) {
    root = removeNode(root, key);
  }
}

const nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13];
const binaryT = new BinaryTree();
nodes.forEach(key => {
  binaryT.insert(key);
});
// console.log(binaryT.getTree());
// binaryT.inorderTraverse(function(key) {
//   console.log(key);
// });
// binaryT.preorderTraverse(function(key) {
//   console.log(key);
// });
binaryT.postorderTraverse(function(key) {
  console.log(key);
});
// console.log(binaryT.min());
// console.log(binaryT.max());
// console.log(binaryT.getTree());
// console.log(binaryT.search(7));
// console.log(binaryT.search(9));
// binaryT.remove(1);
// binaryT.inorderTraverse(function(key) {
//   console.log(key);
// });
