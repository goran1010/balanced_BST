import "./style.css";
import Tree from "./classTree.js";

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testTree = new Tree(testArray);

testTree.insert(-2);
testTree.insert(10000);

testTree.prettyPrint();

testTree.delete(8);

testTree.prettyPrint();
