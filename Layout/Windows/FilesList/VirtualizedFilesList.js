import FilesListItem from './FilesListItem/FilesListItem';
import {VirtualizedList} from 'react-native';
import {memo} from 'react';

function VirtualizedFilesList({
  filesList,
  handlePress,
  handleLongPress,
  setHoveredItem,
  hoveredItem,
}) {
  const renderItem = ({item}) => (
    <FilesListItem
      key={item.path}
      item={item}
      handlePress={handlePress}
      handleLongPress={handleLongPress}
      setHoveredItem={setHoveredItem}
      isHighlighted={item.isHighlighted}
      isHovered={hoveredItem == item}
    />
  );
  return (
    <VirtualizedList
      // onRefresh={() => {}}
      // refreshing={} //refresh flag
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
