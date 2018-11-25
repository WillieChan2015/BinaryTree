## JS实现二叉树

#### 1.首先创建一个类
类里包含根
```JavaScript
function BinaryTree() {
  let root = null;
}
```

#### 2.往类里存放一个Node节点的类
```JavaScript
function BinaryTree() {
  const Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  let root = null;
}
```

#### 3.创建节点函数
```JavaScript
function BinaryTree() {
  // Node 节点的类代码...

  // 根节点
  let root = null

  // 辅助插入节点函数
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
  // 插入节点
  this.insert = function(key) {
    // 新建 Node 的实例
    let newNode = new Node(key);

    // 当根节点为空时
    if (!root) {
      root = newNode;
    }
    else {
      insertNode(root, newNode);
    }
  };
}
```

#### 4.遍历二叉树
1. 中序遍历
中序遍历，简单来说，是 左-根-右。
```JavaScript
function BinaryTree() {
  // 省略上面部分代码...

  // 中序遍历辅助函数
  const inorderTraverseNode = function(node, callback) {
    if (node) {
      inorderTraverseNode(node.left, callback);
      callback(node.key);
      inorderTraverseNode(node.right, callback);
    }
  }

  // 中序遍历
  this.inorderTraverse = function(callBack) {
    inorderTraverseNode(root, callBack);
  }
}
```

2. 前序遍历
前序遍历简单来说就是， 根-左-右。
```JavaScript
function BinaryTree() {
  // 省略上面部分代码...

  // 前序遍历辅助函数
  const preorderTraverseNode = function(node, callback) {
    if (node) {
      callback(node.key);
      preorderTraverseNode(node.left, callback);
      preorderTraverseNode(node.right, callback);
    }
  }

  // 前序遍历
  this.preorderTraverse = function(callback) {
    preorderTraverseNode(root, callback);
  }
}
```

3. 后序遍历
后序遍历简单来说就是， 左-右-根。
```JavaScript
function BinaryTree() {
  // 省略上面部分代码...

  // 后序遍历辅助函数
  const postorderTraverseNode = function(node, callback) {
    if (node) {
      postorderTraverseNode(node.left, callback);
      postorderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 后序遍历
  this.postorderTraverse = function(callback) {
    postorderTraverseNode(root, callback);
  }
}
```

#### 5. 查找最小节点值
```JavaScript
function BinaryTree() {
  // 省略上面部分代码...
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
}
```

#### 6. 查找最大节点值
```JavaScript
function BinaryTree() {
  // 省略上面部分代码...
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
}
```

#### 7. 查找节点
```JavaScript
function BinaryTree() {
  // 省略上面部分代码...
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
}
```

#### 8. 删除节点
```JavaScript
function BinaryTree() {
  // 省略上面部分代码...

  // 辅助函数，查找最小节点并返回
  /*
  * @returns {Node} 
  */
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
```

