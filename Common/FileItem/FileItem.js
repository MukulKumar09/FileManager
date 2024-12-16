import {Text, View} from 'react-native';
import styles from '../../styles/styles';
import {memo} from 'react';
import {bytesToSize} from '../../Services/fileUtils/bytesToSize';
import {unixToDate} from '../../Services/fileUtils/unixToDate';
import unixTo12Hour from '../../Services/fileUtils/unixTo12Hour';
import SmallGrayText from '../SmallGrayText/SmallGrayText';
import Icon from '../Icon/Icon';

function FileItem({item, showSize, showPath, showDate, fontStyle}) {
  // console.log(item);
  return (
    <View style={[styles.rowLayout, styles.bigGap]}>
      <Icon item={item} />
      <View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, fontStyle && styles.oswald]}>
          {item.name ? item.name : item.title}
        </Text>
        {showSize && item.ext !== '/' && (
          <SmallGrayText>{bytesToSize(item.size)}</SmallGrayText>
        )}
        {showPath && <SmallGrayText>{item.path}</SmallGrayText>}
      </View>
      {showDate && (
        <View style={[styles.wide, {alignItems: 'flex-end'}]}>
          <SmallGrayText>{unixToDate(item.mtime)}</SmallGrayText>
          {item.ext !== '/' && (
            <SmallGrayText>{unixTo12Hour(item.mtime)}</SmallGrayText>
          )}
        </View>
      )}
    </View>
  );
}
export default memo(FileItem);
