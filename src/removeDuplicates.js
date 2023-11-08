export default function removeDuplicates(array) {
  let tempArray = array.slice();
  for (let i = 0; i <= tempArray.length - 1; i++) {
    for (let j = i + 1; j < tempArray.length - 1; j++) {
      if (tempArray[i] === tempArray[j]) {
        tempArray.splice(j, 1);
        j--;
      }
    }
  }
  return tempArray;
}
