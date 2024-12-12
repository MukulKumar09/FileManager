export default function getParentFromPath(item) {
  return item.path.replace(/\/[^/]+$/, '');
}
