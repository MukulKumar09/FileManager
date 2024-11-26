import React from 'react';
import FilesListItem from './FilesListItem/FilesListItem';
import {VirtualizedList} from 'react-native';
import {useCallback} from 'react';
export default function VirtualizedFilesList({
  filesList,
  handlePress,
  handleLongPress,
  setHoveredItem,
  hoveredItem,
}) {
  const renderItem = useCallback(
    ({item}) => {
      // console.log('rerend');
      return (
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
    },
    [hoveredItem],
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
