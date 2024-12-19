import VirtualizedFilesListItem from './VirtualizedFilesListItem/VirtualizedFilesListItem';
import {VirtualizedList} from 'react-native';
import {memo, useState, useEffect, useDeferredValue} from 'react';

function VirtualizedFilesList({
  filesList,
  refresh,
  handlePress,
  handleLongPress,
  setHoveredItem,
  setSelectedItems,
  hoveredItem,
}) {
  const [detectPressType, setDetectPressType] = useState(0);
  const [data, setData] = useState(0);
  useEffect(() => {
    if (detectPressType.type == 1) {
      //onPress
      handlePress(detectPressType.item);
    }
    if (detectPressType.type == 2) {
      //onLongPress
      !detectPressType.item.mediaType &&
        handleLongPress(detectPressType.item, detectPressType.event);
    }
  }, [detectPressType]);

  const renderItem = ({item}) => {
    return (
      <VirtualizedFilesListItem
        key={item.path}
        item={item}
        setDetectPressType={setDetectPressType}
        setHoveredItem={setHoveredItem}
        isHighlighted={item.isHighlighted}
        isHovered={hoveredItem == item}
      />
    );
  };

  return (
    <VirtualizedList
      onRefresh={() => {
        refresh(0);
        setSelectedItems(0);
      }}
      removeClippedSubviews={true}
      refreshing={false} //refresh flag
      data={filesList}
      extraData={data}
      keyExtractor={item => item.path}
      getItemCount={data => data.length}
      getItem={(data, index) => data[index]}
      initialNumToRender={15}
      maxToRenderPerBatch={5}
      windowSize={5}
      renderItem={renderItem}
      // getItemLayout={(data, index) => ({
      //   length: 70,
      //   offset: 70 * index,
      //   index,
      // })}
    />
  );
}
export default memo(VirtualizedFilesList);
