import {Pressable, View} from 'react-native';
import styles from '../../../../../../styles/styles';
import {memo} from 'react';
import {unixToDate} from '../../../../../../Services/fileUtils/unixToDate';
import unixTo12Hour from '../../../../../../Services/fileUtils/unixTo12Hour';
import SmallGrayText from '../../../../../../Common/SmallGrayText/SmallGrayText';
import FilesListIte from '../../../../../../Common/FileItem/FileItem';

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
      <View style={[styles.wide, styles.rowLayout, styles.bigGap]}>
        <FilesListIte key={item.path} item={item} showSize={true} />
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <SmallGrayText>{unixToDate(item.mtime)}</SmallGrayText>
        {item.ext !== '/' && (
          <SmallGrayText>{unixTo12Hour(item.mtime)}</SmallGrayText>
        )}
      </View>
    </Pressable>
  );
}
export default memo(VirtualizedFilesListItem);
