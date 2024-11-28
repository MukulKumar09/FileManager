import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import VirtualizedFilesList from './VirtualizedFilesList';
import {Text} from 'react-native';
import handleFileLongPress from '../../../Actions/handleFileLongPress';
import navigateItem from '../../../Actions/navigateItem';
import highlightItemCB from '../../../Actions/highlightItemCB';

function FilesList({filesList, path, setFilesList, index, addBreadCrumb}) {
  const dispatch = useDispatch();

  //shift states to window
  const [selectionFlag, setSelectionFlag] = useState(0);
  const [selectedItems, setSelectedItems] = useState(0);
  const [lastClickedItem, setLastClickedItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});

  useEffect(() => {
    if (selectedItems == 0) setSelectionFlag(0);
  }, [selectedItems]);

  useEffect(() => {
    setSelectionFlag(0);
    setSelectedItems(0);
  }, [path]);

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
        navigateItem(dispatch, index, item, addBreadCrumb);
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
          setSelectedItems(res.selectedItems);
          setFilesList(res.filesList);
        }
      } else {
        callHighlightItemCB(item);
      }
    },
    [selectionFlag, filesList, lastClickedItem],
  );

  return (
    <>
      <Text style={{color: 'white'}}>{selectedItems}</Text>
      <VirtualizedFilesList
        filesList={filesList}
        setHoveredItem={setHoveredItem}
        handlePress={handlePress}
        handleLongPress={handleLongPress}
        hoveredItem={hoveredItem}
      />
    </>
  );
}
export default memo(FilesList);
