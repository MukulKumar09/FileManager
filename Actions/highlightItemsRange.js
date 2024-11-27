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
  console.log(lastSelectItem);
  setSelectedItems(prev => prev + selectedItems);
  const one = tempSelectedItems[indexOfItem];
  console.log('-------- STEP 1');
  const two = lastSelectItem.isHighlighted;
  console.log('-------- STEP 2');
  const obj = {
    item: one,
    isHighlighted: two,
  };
  console.log('-------- STEP 3');
  setLastSelectItem(obj);
  console.log('-------- STEP 4');

  return tempSelectedItems;
}
