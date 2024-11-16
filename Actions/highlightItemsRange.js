export default function highlightItemsRange(
  item,
  lastSelectItem,
  filesList,
  setLastSelectItem,
  setSelectedItems,
) {
  const tempSelectedItems = [...filesList];

  const indexOfLastSelectItem = tempSelectedItems.indexOf(lastSelectItem.item);
  const indexOfItem = tempSelectedItems.indexOf(item);
  const step = indexOfItem >= indexOfLastSelectItem ? 1 : -1;

  let selectedItems = 0;
  for (
    var i = indexOfLastSelectItem + step;
    step > 0 ? i <= indexOfItem : i >= indexOfItem;
    i += step
  ) {
    if (lastSelectItem.isHighlighted !== tempSelectedItems[i].isHighlighted) {
      selectedItems += lastSelectItem.isHighlighted ? 1 : -1;
      tempSelectedItems[i] = {
        ...tempSelectedItems[i],
        isHighlighted: lastSelectItem.isHighlighted,
      };
    }
  }
  setSelectedItems(prev => prev + selectedItems);
  setLastSelectItem({
    item: tempSelectedItems[indexOfItem],
    isHighlighted: lastSelectItem.isHighlighted,
  });

  return tempSelectedItems;
}
