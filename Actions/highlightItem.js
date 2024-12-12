export default function highlightItem(
  item,
  filesList,
  setLastClickedItem,
  setSelectedItems,
) {
  const tempFilesList = [...filesList];
  const indexOfItem = tempFilesList.indexOf(item);

  if (tempFilesList[indexOfItem]['isHighlighted']) {
    var isHighlighted = 0;
    setSelectedItems(prev => prev - 1);
  } else {
    var isHighlighted = 1;
    setSelectedItems(prev => prev + 1);
  }
  tempFilesList[indexOfItem] = {...item, isHighlighted};
  setLastClickedItem({
    item: tempFilesList[indexOfItem],
    isHighlighted,
  });
  return tempFilesList;
}
