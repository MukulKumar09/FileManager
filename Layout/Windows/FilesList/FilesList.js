import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import navigateItem from '../../../Actions/navigateItem';
import highlightItem from '../../../Actions/highlightItem';
import highlightItemsRange from '../../../Actions/highlightItemsRange';
import VirtualizedFilesList from './VirtualizedFilesList';

function FilesList({filesList, path, setFilesList, index, addBreadCrumb}) {
  const dispatch = useDispatch();

  //shift states to window
  const [selectionFlag, setSelectionFlag] = useState(0);
  const [selectedItems, setSelectedItems] = useState(0);
  const [lastSelectItem, setLastSelectItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});

  useEffect(() => {
    if (selectedItems == 0) setSelectionFlag(0);
  }, [selectedItems]);

  useEffect(() => {
    setSelectionFlag(0);
    setSelectedItems(0);
  }, [path]);

  const activateDragNDrop = event => {
    const x = event.pageX;
    const y = event.pageY;
    dispatch({
      type: 'DRAGNDROPICON',
      payload: {
        visible: 0,
        items: [...filesList.filter(item => item.isHighlighted)],
        x,
        y,
      },
    });
  };

  const handlePress = useCallback(
    item => {
      if (selectionFlag) {
        const selectItems = highlightItem(
          item,
          filesList,
          setLastSelectItem,
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
      activateDragNDrop(event);
      if (selectionFlag) {
        console.log('just clicked');
        const selectItems = highlightItemsRange(
          item,
          lastSelectItem,
          filesList,
          setLastSelectItem,
          setSelectedItems,
        );
        setFilesList(selectItems);
      } else {
        setSelectionFlag(1);
        const selectItems = highlightItem(
          item,
          filesList,
          setLastSelectItem,
          setSelectedItems,
        );
        setFilesList(selectItems);
      }
    },
    [filesList, lastSelectItem, selectionFlag],
  );

  return (
    <VirtualizedFilesList
      filesList={filesList}
      handlePress={handlePress}
      handleLongPress={handleLongPress}
      setHoveredItem={setHoveredItem}
      hoveredItem={hoveredItem}
    />
  );
}
export default memo(FilesList);
