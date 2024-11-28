import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import navigateItem from '../../../Actions/navigateItem';
import highlightItem from '../../../Actions/highlightItem';
import highlightItemsRange from '../../../Actions/highlightItemsRange';
import VirtualizedFilesList from './VirtualizedFilesList';
import {Text} from 'react-native';

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

  const prepareDragNDrop = useCallback(
    (item, event) => {
      const {nativeEvent} = event;
      const x = nativeEvent.pageX;
      const y = nativeEvent.pageY;
      dispatch({
        type: 'DRAGNDROPICON',
        payload: {
          visible: 0,
          isActive: item.isHighlighted,
          items: [...filesList.filter(item => item.isHighlighted)],
          x,
          y,
        },
      });
    },
    [lastClickedItem, filesList],
  );

  const handlePress = useCallback(
    item => {
      if (selectionFlag) {
        const selectItems = highlightItem(
          item,
          filesList,
          setLastClickedItem,
          setSelectedItems,
        );
        setFilesList(selectItems);
      } else {
        navigateItem(dispatch, index, item, addBreadCrumb);
      }
    },
    [filesList, index, selectionFlag],
  );

  const handleLongPress = useCallback(
    (item, event) => {
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
          prepareDragNDrop(item, event);
        } else {
          const selectItems = highlightItemsRange(
            item,
            lastClickedItem,
            filesList,
            setLastClickedItem,
            setSelectedItems,
          );
          setFilesList(selectItems);
        }
      } else {
        setSelectionFlag(1);
        const selectItems = highlightItem(
          item,
          filesList,
          setLastClickedItem,
          setSelectedItems,
        );
        setFilesList(selectItems);
      }
    },
    [filesList, lastClickedItem, selectionFlag],
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
