import {Pressable, Text, View} from 'react-native';
import styles from '../../../../styles/styles';
import useIcon from '../../../../Hooks/useIcon';
import {memo} from 'react';
import {unixToDate} from '../../../../Services/unixToDate';
import {bytesToSize} from '../../../../Services/bytesToSize';

function FilesListItem({
  item,
  handlePress,
  handleLongPress,
  setHoveredItem,
  isHighlighted,
  isHovered,
}) {
  return (
    <Pressable
      onPressIn={() => setHoveredItem(item)}
      onPress={() => handlePress(item)}
      onLongPress={event => handleLongPress(item, event.nativeEvent)}
      style={[
        styles.rowLayout,
        styles.largeGap,
        isHighlighted && styles.listItemHighlight,
        isHovered && styles.listItemSelected,
        {justifyContent: 'space-between'},
      ]}>
      <View
        style={[styles.wide, styles.rowLayout, styles.padding, styles.bigGap]}>
        {useIcon(item)}
        <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.text]}>
          {item.name}
        </Text>
      </View>
      <View style={[styles.padding, {alignItems: 'flex-end'}]}>
        <Text style={[styles.text, styles.smallText]}>
          {unixToDate(item.mtime)}
        </Text>
        {item.ext !== '/' && (
          <Text style={[styles.text, styles.smallText]}>
            {bytesToSize(item.size)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
export default memo(FilesListItem);
