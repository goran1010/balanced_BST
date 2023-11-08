import buildTree from "./buildTree.js";
import removeDuplicates from "./removeDuplicates.js";
import mergeSort from "./mergeSort.js";
import Node from "./classNode.js";
import findLastLeftNode from "./findLastLeftNode.js";

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
    if (currentNode === null) return;
    if (currentNode.data === deleteData) {
      if (currentNode.left === null && currentNode.right === null) {
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
    if (currentNode === null) return;
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
}
