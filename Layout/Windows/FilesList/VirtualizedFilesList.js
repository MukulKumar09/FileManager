import FilesListItem from './FilesListItem/FilesListItem';
import {VirtualizedList} from 'react-native';
import {memo, useState, useEffect} from 'react';

function VirtualizedFilesList({
  filesList,
  refresh,
  handlePress,
  handleLongPress,
  setHoveredItem,
  hoveredItem,
}) {
  const [detectPressType, setDetectPressType] = useState(0);
  useEffect(() => {
    if (detectPressType.type == 1) {
      //onPress
      handlePress(detectPressType.item);
    }
    if (detectPressType.type == 2) {
      //onLongPress
      handleLongPress(detectPressType.item, detectPressType.event);
    }
  }, [detectPressType]);
  const renderItem = ({item}) => {
    return (
      <FilesListItem
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
      onRefresh={() => refresh(0)}
      refreshing={false} //refresh flag
      data={filesList}
      keyExtractor={item => item.path}
      getItemCount={data => data.length}
      getItem={(data, index) => data[index]}
      initialNumToRender={15}
      // maxToRenderPerBatch={5}
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
