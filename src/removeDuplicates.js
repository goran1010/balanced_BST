export default function removeDuplicates(array) {
  for (let i = 0; i <= array.length - 1; i++) {
    for (let j = i + 1; j < array.length - 1; j++) {
      if (array[i] === array[j]) {
        array.splice(j, 1);
        j--;
      }
    }
  }
  return array;
}
