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
  if (item.isHighlighted) {
    prepareDragNDrop(dispatch, filesList, event);
  } else {
    prepareDragNDrop(dispatch, 0);
    return highlightItemsRange(item, lastClickedItem, filesList);
  }
};
export default handleFileLongPress;
