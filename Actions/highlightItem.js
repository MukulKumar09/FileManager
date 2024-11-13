export default function highlightItem(
  item,
  filesList,
  setFilesList,
  setSelectionFlag,
  setSelectedItems,
) {
  setSelectionFlag(1);
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
  setFilesList(tempFilesList);
}
