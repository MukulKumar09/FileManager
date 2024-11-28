import highlightItemCB from './highlightItemCB';
import highlightItemsRange from './highlightItemsRange';
import prepareDragNDrop from './prepareDragNDrop';

const handleFileLongPress = (
  dispatch,
  item,
  event,
  lastClickedItem,
  selectionFlag,
  filesList,
  setLastClickedItem,
  setSelectedItems,
  setFilesList,
  setSelectionFlag,
) => {
  // Long press highlighted - last highlighted - dragNDrop
  //                           last not-highlighted - deselect range
  // Long press not highlighted - last highlighted - select range
  //                             last not-highlighted - do nothing

  if (selectionFlag) {
    if (
      (lastClickedItem.isHighlighted || lastClickedItem == 0) &&
      item.isHighlighted == 1
    ) {
      //only prepare dragnDrop if last thing done was either selecting an item, or deselecting range
      prepareDragNDrop(dispatch, filesList, item, event);
    } else {
      const res = highlightItemsRange(item, lastClickedItem, filesList);
      setLastClickedItem(res.lastClickedItem);
      setSelectedItems(res.selectedItems);
      setFilesList(res.filesList);
    }
  } else {
    highlightItemCB(
      setSelectionFlag,
      item,
      filesList,
      setLastClickedItem,
      setSelectedItems,
      setFilesList,
    );
  }
};
export default handleFileLongPress;
