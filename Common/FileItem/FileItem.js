import {Text, View} from 'react-native';
import styles from '../../styles/styles';
import {memo} from 'react';
import {bytesToSize} from '../../Services/fileUtils/bytesToSize';
import SmallGrayText from '../SmallGrayText/SmallGrayText';
import Icon from '../Icon/Icon';

function FilesListIte({item, showSize, showPath, fontStyle}) {
  return (
    <>
      <Icon item={item} />
      <View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, fontStyle && styles.oswald]}>
          {item.name}
        </Text>
        {showSize && item.ext !== '/' && (
          <SmallGrayText>{bytesToSize(item.size)}</SmallGrayText>
        )}
        {showPath && <SmallGrayText>{item.path}</SmallGrayText>}
      </View>
    </>
  );
}
export default memo(FilesListIte);
