import highlightItem from './highlightItem';

export default function highlightItemCB(
  setSelectionFlag,
  item,
  filesList,
  setLastClickedItem,
  setSelectedItems,
  setFilesList,
) {
  setSelectionFlag(1);
  const selectItems = highlightItem(
    item,
    filesList,
    setLastClickedItem,
    setSelectedItems,
  );
  setFilesList(selectItems);
}
