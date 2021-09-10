export default function atLeastOneTruthy(object: Object) {
  const keys = Object.keys(object) as Array<keyof Object>;
  const values = keys.map((key) => !!object[key]);
  const reducer = (previousValue: boolean, currentValue: boolean) =>
    previousValue || currentValue;
  const finalValue = values.reduce(reducer);
  return finalValue;
}
