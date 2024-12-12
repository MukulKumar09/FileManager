export default function collectHighilightedItems(filesList) {
  return [...filesList.filter(item => item.isHighlighted)];
}
