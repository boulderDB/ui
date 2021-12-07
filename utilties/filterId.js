export default function filterId(value) {
  if (value instanceof Array) {
    return value.map((item) => item.id);
  }

  return value.id;
}
