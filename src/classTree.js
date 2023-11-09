import buildTree from "./buildTree.js";
import removeDuplicates from "./removeDuplicates.js";
import mergeSort from "./mergeSort.js";
import Node from "./classNode.js";
import findLastLeftNode from "./findLastLeftNode.js";
import getMaxHeight from "./getMaxHeight.js";

export default class Tree {
  constructor(array) {
    const tempArray = array.slice();
    const noDuplicatesArray = removeDuplicates(tempArray);
    const sortedArray = mergeSort(noDuplicatesArray);
    this.root = buildTree(sortedArray);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(insertData, currentNode = this.root) {
    if (!this.root) {
      this.root = new Node(insertData);
      return;
    }
    if (insertData === currentNode.data) return;
    if (insertData < currentNode.data) {
      if (!currentNode.left) {
        currentNode.left = new Node(insertData);
        return;
      }
      return this.insert(insertData, currentNode.left);
    }
    if (insertData > currentNode.data) {
      if (!currentNode.right) {
        currentNode.right = new Node(insertData);
        return;
      }
      return this.insert(insertData, currentNode.right);
    }
  }

  // Find a way to refactor this delete method !
  delete(deleteData, previousNode = this.root, currentNode = this.root) {
    if (!currentNode) return;
    if (currentNode.data === deleteData) {
      if (!currentNode.left && !currentNode.right) {
        if (previousNode.data === currentNode.data) {
          this.root = null;
          return;
        }
        if (currentNode.data > previousNode.data) {
          previousNode.right = null;
          return;
        }
        previousNode.left = null;
        return;
      }
      if (currentNode.left && !currentNode.right) {
        if (previousNode.data === currentNode.data) {
          this.root = currentNode.left;
          return;
        }
        if (currentNode.data > previousNode.data) {
          previousNode.right = currentNode.left;
          return;
        }
        previousNode.left = currentNode.left;
        return;
      }
      if (!currentNode.left && currentNode.right) {
        if (previousNode.data === currentNode.data) {
          this.root = currentNode.right;
          return;
        }
        if (currentNode.data > previousNode.data) {
          previousNode.right = currentNode.right;
          return;
        }
        previousNode.left = currentNode.right;
        return;
      }
      if (currentNode.left && currentNode.right) {
        if (previousNode.data === currentNode.data) {
          this.root.data = findLastLeftNode(this.root.right).data;
          return;
        }
        if (currentNode.data > previousNode.data) {
          previousNode.right.data = findLastLeftNode(currentNode.right).data;
          return;
        }
        previousNode.left.data = findLastLeftNode(currentNode.right).data;
        return;
      }
    }
    if (!currentNode) return;
    if (deleteData < currentNode.data)
      return this.delete(
        deleteData,
        (previousNode = currentNode),
        currentNode.left
      );
    if (deleteData > currentNode.data)
      return this.delete(
        deleteData,
        (previousNode = currentNode),
        currentNode.right
      );
  }

  find(findData, currentNode = this.root) {
    if (currentNode === null) return null;
    if (currentNode.data === findData) return currentNode;
    if (findData < currentNode.data) {
      return this.find(findData, currentNode.left);
    }
    if (findData > currentNode.data) {
      return this.find(findData, currentNode.right);
    }
  }

  levelOrder(callback = null, queue = [this.root], array = []) {
    let currentNode = queue.shift();
    if (!currentNode) {
      if (callback === null) {
        return array;
      } else return;
    }
    if (callback === null) array.push(currentNode.data);
    else callback(currentNode.data);
    if (currentNode.left != null) queue.push(currentNode.left);
    if (currentNode.right != null) queue.push(currentNode.right);
    return this.levelOrder(callback, queue, array);
  }

  preOrder(callback = null, currentNode = this.root, array = []) {
    if (!currentNode) {
      if (callback === null) {
        return array;
      } else return;
    }
    if (callback === null) array.push(currentNode.data);
    else callback(currentNode.data);
    this.preOrder(callback, currentNode.left, array);
    this.preOrder(callback, currentNode.right, array);
    return array;
  }

  inOrder(callback = null, currentNode = this.root, array = []) {
    if (!currentNode) {
      if (callback === null) {
        return array;
      } else return;
    }
    this.inOrder(callback, currentNode.left, array);
    if (callback === null) array.push(currentNode.data);
    else callback(currentNode.data);
    this.inOrder(callback, currentNode.right, array);
    return array;
  }

  postOrder(callback = null, currentNode = this.root, array = []) {
    if (!currentNode) {
      if (callback === null) {
        return array;
      } else return;
    }
    this.postOrder(callback, currentNode.left, array);
    this.postOrder(callback, currentNode.right, array);
    if (callback === null) array.push(currentNode.data);
    else callback(currentNode.data);
    return array;
  }

  height(findData, currentNode = this.root) {
    if (currentNode === null) return null;
    if (currentNode.data === findData) return getMaxHeight(currentNode);
    if (findData < currentNode.data) {
      return this.height(findData, currentNode.left);
    }
    if (findData > currentNode.data) {
      return this.height(findData, currentNode.right);
    }
  }

  depth(findData, currentNode = this.root, steps = 0) {
    if (currentNode === null) return null;
    if (currentNode.data === findData) return steps;
    if (findData < currentNode.data) {
      steps++;
      return this.depth(findData, currentNode.left, steps);
    }
    if (findData > currentNode.data) {
      steps++;
      return this.depth(findData, currentNode.right, steps);
    }
  }

  isBalanced(currentNode = this.root) {
    // Base condition
    if (currentNode == null) return true;

    // for left and right subtree height
    let leftHeight = getMaxHeight(currentNode.left);
    let rightHeight = getMaxHeight(currentNode.right);

    // allowed values for (leftHeight - rightHeight) are 1, -1, 0
    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(currentNode.left) == true &&
      this.isBalanced(currentNode.right) == true
    )
      return true;

    // if we reach here means tree is not
    // height-balanced tree
    return false;
  }

  rebalance() {
    const array = this.inOrder();
    this.root = buildTree(array);
  }
}
