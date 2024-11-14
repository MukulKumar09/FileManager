import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import navigateItem from '../../../Actions/navigateItem';
import FilesListItem from './FilesListItem/FilesListItem';
import highlightItem from '../../../Actions/highlightItem';
import highlightItemsRange from '../../../Actions/highlightItemsRange';

function FilesList({filesList, setFilesList, index, addBreadCrumb}) {
  const dispatch = useDispatch();

  //shift states to window
  const [selectionFlag, setSelectionFlag] = useState(0);
  const [selectedItems, setSelectedItems] = useState(0);
  const [lastSelectItem, setLastSelectItem] = useState();

  // useEffect(() => console.log(lastSelectItem), [lastSelectItem]);

  useEffect(() => {
    if (selectedItems == 0) setSelectionFlag(0);
  }, [selectedItems]);

  useEffect(() => {
    const selected = filesList.filter(item => item.isHighlighted);
    setSelectedItems(selected.length);
  }, [filesList]);

  const handlePress = useCallback(
    item => {
      if (selectionFlag) {
        const selectItems = highlightItem(item, filesList, setLastSelectItem);
        setFilesList(selectItems);
      } else {
        navigateItem(dispatch, index, item, addBreadCrumb);
      }
    },
    [filesList, index, selectionFlag],
  );

  const handleLongPress = useCallback(
    (e, item) => {
      if (selectionFlag) {
        if (lastSelectItem.isHighlighted && item.isHighlighted) {
          const {pageX, pageY} = e.nativeEvent;
          dispatch({
            type: 'DRAGNDROPICON',
            payload: {
              coordinates: {pageX, pageY},
              items: [...filesList.filter(item => item.isHighlighted)],
            },
          });
        } else {
          const selectItems = highlightItemsRange(
            item,
            lastSelectItem,
            filesList,
            setLastSelectItem,
          );
          setFilesList(selectItems);
        }
      } else {
        setSelectionFlag(1);
        const selectItems = highlightItem(item, filesList, setLastSelectItem);
        setFilesList(selectItems);
      }
    },
    [lastSelectItem, filesList, selectionFlag],
  );

  return (
    <ScrollView>
      {/* convert to virtualized list */}
      {filesList.map(item => {
        return (
          <FilesListItem
            key={item.path}
            item={item}
            handlePress={handlePress}
            handleLongPress={handleLongPress}
            setLastSelectItem={setLastSelectItem}
            isHighlighted={item.isHighlighted}
          />
        );
      })}
    </ScrollView>
  );
}
export default React.memo(FilesList);
