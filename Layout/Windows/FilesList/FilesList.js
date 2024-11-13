import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import navigateItem from '../../../Actions/navigateItem';
import FilesListItem from './FilesListItem/FilesListItem';
import highlightItem from '../../../Actions/highlightItem';

function FilesList({filesList, setFilesList, dispatch, index, addBreadCrumb}) {
  const [selectionFlag, setSelectionFlag] = useState(0);
  const [selectedItems, setSelectedItems] = useState(0);

  useEffect(() => {
    if (selectedItems == 0) setSelectionFlag(0);
  }, [selectedItems]);
  const handlePress = item => {
    if (selectionFlag) {
      handleHighlightItem(item);
    } else {
      navigateItem(dispatch, index, item, addBreadCrumb);
    }
  };

  const handleLongPress = item => {
    if (selectionFlag) {
    } else {
      handleHighlightItem(item);
    }
  };

  const handleHighlightItem = item => {
    highlightItem(
      item,
      filesList,
      setFilesList,
      setSelectionFlag,
      setSelectedItems,
    );
  };

  return (
    <ScrollView>
      {filesList.map(item => {
        return (
          <FilesListItem
            key={item.path}
            item={item}
            handlePress={handlePress}
            handleLongPress={handleLongPress}
            isHighlighted={item.isHighlighted}
          />
        );
      })}
    </ScrollView>
  );
}
export default React.memo(FilesList);
