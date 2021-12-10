export default function isString(value: any): value is string {
  return value instanceof String || typeof value === 'string';
}
