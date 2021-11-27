export default function contextualizedApiPath(location, path) {
  return `/api/${location?.url}${path}`;
}
