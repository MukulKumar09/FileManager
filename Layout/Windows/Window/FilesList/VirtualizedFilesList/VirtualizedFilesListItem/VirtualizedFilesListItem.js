import {Pressable} from 'react-native';
import styles from '../../../../../../styles/styles';
import {memo} from 'react';
import FileItem from '../../../../../../Common/FileItem/FileItem';

function VirtualizedFilesListItem({
  item,
  setDetectPressType,
  setHoveredItem,
  isHighlighted,
  isHovered,
}) {
  return (
    <Pressable
      onPressIn={() => setHoveredItem(item)}
      onPress={() => setDetectPressType({type: 1, item})}
      onLongPress={event => setDetectPressType({type: 2, item, event})}
      style={[
        styles.rowLayout,
        styles.padding,
        styles.largeGap,
        isHighlighted && styles.listItemHighlighted,
        isHovered && styles.listItemHovererd,
        {justifyContent: 'space-between'},
      ]}>
      <FileItem
        key={item.path}
        item={item}
        showSize={item.isMedia ? false : true}
        showPath={item.isMedia ? true : false}
        showDate={item.isMedia ? false : true}
      />
    </Pressable>
  );
}
export default memo(VirtualizedFilesListItem);
