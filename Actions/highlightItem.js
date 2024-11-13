export default function highlightItem(item, filesList, setLastSelectItem) {
  const tempFilesList = [...filesList];
  const indexOfItem = tempFilesList.indexOf(item);

  if (tempFilesList[indexOfItem]['isHighlighted']) {
    var isHighlighted = 0;
  } else {
    var isHighlighted = 1;
  }
  tempFilesList[indexOfItem] = {...item, isHighlighted};
  setLastSelectItem({item: tempFilesList[indexOfItem], isHighlighted});
  return tempFilesList;
}
