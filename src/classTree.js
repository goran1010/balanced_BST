import buildTree from "./buildTree.js";
import removeDuplicates from "./removeDuplicates.js";

export default class Tree {
  constructor(array) {
    const noDuplicatesArray = removeDuplicates(array);
    const sortedArray = noDuplicatesArray.sort((a, b) => a - b);
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
}
