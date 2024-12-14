import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import handleFileLongPress from '../../../../Actions/handleFileLongPress';
import navigateItem from '../../../../Actions/navigateItem';
import highlightItemCB from '../../../../Actions/highlightItemCB';
import VirtualizedFilesList from './VirtualizedFilesList/VirtualizedFilesList';

function FilesList({
  filesList,
  refresh,
  isRefresh,
  path,
  setFilesList,
  index,
  selectedItems,
  setSelectedItems,
  pushBreadCrumb,
}) {
  const dispatch = useDispatch();

  const [selectionFlag, setSelectionFlag] = useState(0);
  const [lastClickedItem, setLastClickedItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});

  useEffect(() => {
    if (selectedItems == 0) {
      setSelectionFlag(0);
    }
  }, [selectedItems]);

  useEffect(() => {
    setSelectionFlag(0);
    setSelectedItems(0);
  }, [path, isRefresh]);

  const callHighlightItemCB = item =>
    highlightItemCB(
      setSelectionFlag,
      item,
      filesList,
      setLastClickedItem,
      setSelectedItems,
      setFilesList,
    );

  const handlePress = useCallback(
    item => {
      if (selectionFlag) {
        callHighlightItemCB(item);
      } else {
        navigateItem(dispatch, pushBreadCrumb, index, item);
      }
    },
    [selectionFlag, filesList, index],
  );
  const handleLongPress = useCallback(
    (item, event) => {
      if (selectionFlag) {
        const res = handleFileLongPress(
          dispatch,
          item,
          event,
          lastClickedItem,
          filesList,
        );
        if (res) {
          setLastClickedItem(res.lastClickedItem);
          setSelectedItems(prev => prev + res.selectedItems);
          setFilesList(res.filesList);
        }
      } else {
        callHighlightItemCB(item);
      }
    },
    [selectionFlag, filesList, lastClickedItem],
  );

  return (
    <VirtualizedFilesList
      refresh={refresh}
      setSelectedItems={setSelectedItems}
      filesList={filesList}
      setHoveredItem={setHoveredItem}
      handlePress={handlePress}
      handleLongPress={handleLongPress}
      hoveredItem={hoveredItem}
    />
  );
}
export default memo(FilesList);
