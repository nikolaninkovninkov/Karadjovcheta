export default function range(number: number): Array<number> {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(i);
  }
  return array;
}
