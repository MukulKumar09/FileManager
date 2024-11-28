import highlightItemCB from './highlightItemCB';
import navigateItem from './navigateItem';

export default function handleFilePress(
  selectionFlag,
  setSelectionFlag,
  item,
  filesList,
  setLastClickedItem,
  setSelectedItems,
  setFilesList,
  dispatch,
  index,
  addBreadCrumb,
) {
  if (selectionFlag) {
    highlightItemCB(
      setSelectionFlag,
      item,
      filesList,
      setLastClickedItem,
      setSelectedItems,
      setFilesList,
    );
  } else {
    navigateItem(dispatch, index, item, addBreadCrumb);
  }
}
