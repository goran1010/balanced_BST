import "./style.css";
import Tree from "./classTree.js";
import randomNumbersArray from "./randomNumbersArray.js";

const myArray = randomNumbersArray(15);
console.log(myArray);

const testTree = new Tree(myArray);
console.log(testTree.isBalanced());

console.log("levelOrder : " + testTree.levelOrder());
console.log("preOrder : " + testTree.preOrder());
console.log("postOrder : " + testTree.postOrder());
console.log("inOrder : " + testTree.inOrder());

testTree.insert(10000);
testTree.insert(10010);
testTree.insert(10032);

console.log(testTree.isBalanced());
testTree.rebalance();
console.log(testTree.isBalanced());

console.log("levelOrder : " + testTree.levelOrder());
console.log("preOrder : " + testTree.preOrder());
console.log("postOrder : " + testTree.postOrder());
console.log("inOrder : " + testTree.inOrder());

testTree.prettyPrint();
