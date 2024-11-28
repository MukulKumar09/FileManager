import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import VirtualizedFilesList from './VirtualizedFilesList';
import {Text} from 'react-native';
import handleFileLongPress from '../../../Actions/handleFileLongPress';
import handleFilePress from '../../../Actions/handleFilePress';

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

  const handlePress = useCallback(
    item => {
      handleFilePress(
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
      );
    },
    [filesList, index, selectionFlag],
  );

  const handleLongPress = useCallback(
    (item, event) => {
      handleFileLongPress(
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
      );
    },
    [lastClickedItem, selectionFlag, filesList],
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
