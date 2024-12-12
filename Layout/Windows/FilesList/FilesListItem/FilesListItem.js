import {Pressable, Text, View} from 'react-native';
import styles from '../../../../styles/styles';
import {Suspense, memo, lazy} from 'react';
import {unixToDate} from '../../../../Services/fileUtils/unixToDate';
import {bytesToSize} from '../../../../Services/fileUtils/bytesToSize';
import unixTo12Hour from '../../../../Services/fileUtils/unixTo12Hour';
import SmallGrayText from '../../../../Common/SmallGrayText/SmallGrayText';
import Icon from './Icon/Icon';

function FilesListItem({
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
        styles.largeGap,
        isHighlighted && styles.listItemHighlight,
        isHovered && styles.listItemSelected,
        {justifyContent: 'space-between'},
      ]}>
      <View
        style={[styles.wide, styles.rowLayout, styles.padding, styles.bigGap]}>
        <Icon path={item.path} ext={item.ext} type={item.type} />
        <View>
          <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.text]}>
            {item.name}
          </Text>
          {item.ext !== '/' && (
            <SmallGrayText>{bytesToSize(item.size)}</SmallGrayText>
          )}
          {item.isSearched && <SmallGrayText>{item.path}</SmallGrayText>}
        </View>
      </View>
      <View style={[styles.padding, {alignItems: 'flex-end'}]}>
        <SmallGrayText>{unixToDate(item.mtime)}</SmallGrayText>
        {item.ext !== '/' && (
          <SmallGrayText>{unixTo12Hour(item.mtime)}</SmallGrayText>
        )}
      </View>
    </Pressable>
  );
}
export default memo(FilesListItem);
