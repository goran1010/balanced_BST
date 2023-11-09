export default function getMaxHeight(currentNode, max = 0) {
  if (!currentNode) return max;
  if (currentNode.left) {
    max++;
    let newMax = getMaxHeight(currentNode.left, max);
    if (newMax > max) return newMax;
    else return max;
  }
  if (currentNode.right) {
    max++;
    let newMax = getMaxHeight(currentNode.right, max);
    if (newMax > max) return newMax;
    else return max;
  }
  return max;
}
