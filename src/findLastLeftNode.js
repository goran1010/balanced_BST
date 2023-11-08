export default function findLastLeftNode(
  currentNode,
  previousNode = currentNode
) {
  if (currentNode.left === null) {
    previousNode.left = currentNode.right;
    return currentNode;
  }
  previousNode = currentNode;
  return findLastLeftNode(currentNode.left, previousNode);
}
