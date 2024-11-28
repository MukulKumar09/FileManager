import highlightItemsRange from './highlightItemsRange';
import prepareDragNDrop from './prepareDragNDrop';

const handleFileLongPress = (
  dispatch,
  item,
  event,
  lastClickedItem,
  filesList,
) => {
  // Long press highlighted - last highlighted - dragNDrop
  //                           last not-highlighted - deselect range
  // Long press not highlighted - last highlighted - select range
  //                             last not-highlighted - do nothing

  if (
    (lastClickedItem.isHighlighted || lastClickedItem == 0) &&
    item.isHighlighted == 1
  ) {
    //only prepare dragnDrop if last thing done was either selecting an item, or deselecting range
    prepareDragNDrop(dispatch, filesList, item, event);
  } else {
    return highlightItemsRange(item, lastClickedItem, filesList);
  }
};
export default handleFileLongPress;
