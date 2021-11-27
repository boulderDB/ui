export default function isDoubt(type) {
  if (!type) {
    return false;
  }

  return type.includes("-pending-doubt");
}
