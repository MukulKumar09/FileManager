export default function highlightItemsRange(
  item,
  lastSelectItem,
  filesList,
  setLastSelectItem,
) {
  const tempSelectedItems = [...filesList];

  const indexOfLastSelectItem = tempSelectedItems.indexOf(lastSelectItem.item);
  const indexOfItem = tempSelectedItems.indexOf(item);
  const step = indexOfItem >= indexOfLastSelectItem ? 1 : -1;

  for (
    var i = indexOfLastSelectItem;
    step > 0 ? i <= indexOfItem : i >= indexOfItem;
    i += step
  ) {
    tempSelectedItems[i] = {
      ...tempSelectedItems[i],
      isHighlighted: lastSelectItem.isHighlighted,
    };
  }
  setLastSelectItem({
    item: tempSelectedItems[indexOfItem],
    isHighlighted: lastSelectItem.isHighlighted,
  });

  return tempSelectedItems;
}
