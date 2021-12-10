export default function getFirstPropertyValue(obj: Object) {
  const firstKey = Object.keys(obj)[0] as keyof Object;
  const firstValue = obj[firstKey];
  return firstValue;
}
