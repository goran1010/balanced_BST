export default function randomNumbersArray(numbers) {
  const arrayOfNumbers = [];
  while (numbers) {
    arrayOfNumbers.push(Math.floor(Math.random() * 99 + 1));
    numbers--;
  }
  return arrayOfNumbers;
}
