export default function range(n: number) {
  const array = new Array(n).fill(0).map((_, index) => index);
  return array;
}
