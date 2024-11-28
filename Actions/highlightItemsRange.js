export default function highlightItemsRange(
  item,
  lastClickedItem,
  filesList,
  setLastClickedItem,
  setSelectedItems,
) {
  const tempSelectedItems = [...filesList];
  const indexOfLastSelectItem = tempSelectedItems.indexOf(lastClickedItem.item);
  const indexOfItem = tempSelectedItems.indexOf(item);
  const step = indexOfItem >= indexOfLastSelectItem ? 1 : -1;
  let selectedItems = 0;

  if (!item.isHighlighted && lastClickedItem.isHighlighted) {
    //select range
    for (
      var i = indexOfLastSelectItem + step;
      step > 0 ? i <= indexOfItem : i >= indexOfItem;
      i += step
    ) {
      if (!tempSelectedItems[i].isHighlighted) {
        selectedItems += 1;
        tempSelectedItems[i] = {
          ...tempSelectedItems[i],
          isHighlighted: 1,
        };
      }
    }

    setLastClickedItem({
      item: tempSelectedItems[indexOfItem],
      isHighlighted: lastClickedItem.isHighlighted,
    });
  }

  if (item.isHighlighted && !lastClickedItem.isHighlighted) {
    //deselect range
    for (
      var i = indexOfLastSelectItem + step;
      step > 0 ? i <= indexOfItem : i >= indexOfItem;
      i += step
    ) {
      if (tempSelectedItems[i].isHighlighted) {
        selectedItems -= 1;
        tempSelectedItems[i] = {
          ...tempSelectedItems[i],
          isHighlighted: 0,
        };
      }
    }
    //setting it to 0, so that dragNDrop can be activated right after deselecting range
    setLastClickedItem(0);
  }

  setSelectedItems(prev => prev + selectedItems);

  return tempSelectedItems;
}
