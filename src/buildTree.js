import Node from "./classNode.js";

// export default function buildTree(array, start = 0, end = array.length - 1) {
//   if (start > end) return null;
//   let mid = Math.floor((start + end) / 2);
//   let newNode = new Node(array[mid]);
//   newNode.left = buildTree(array, start, mid - 1);
//   newNode.right = buildTree(array, mid + 1, end);
//   return newNode;
// }

export default function buildTree(array, mid = array.length) {
  if (!array.length) return null;
  mid = Math.floor(array.length / 2);
  let newNode = new Node(array[mid]);
  newNode.left = buildTree(array.slice(0, mid), mid);
  newNode.right = buildTree(array.slice(mid + 1), mid);
  return newNode;
}
