import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import SmallGrayText from '../../../Common/SmallGrayText/SmallGrayText';
import Icon from '../../Windows/FilesList/FilesListItem/Icon/Icon';

export default function Clipboard({onRequestClose}) {
  const dispatch = useDispatch();
  const state = {
    clipboardItems: useSelector(state => state.clipboardItems),
  };
  return (
    <View style={[styles.bigGap]}>
      <Text style={[styles.text, styles.smallText]}>
        {state.clipboardItems.items.length} items
      </Text>
      {state.clipboardItems.items.map(item => (
        <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
          <Icon item={item}>
          <View style={[styles.wide]}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text]}>
              {item.name}
            </Text>
            <SmallGrayText ellipsizeMode="tail" numberOfLines={2}>
              {item.path}
            </SmallGrayText>
          </View>
        </View>
      ))}
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <BorderButton
          label="Clear"
          onPress={() => {
            dispatch({type: 'CLEARCB'});
          }}
        />
        <BorderButton label="Close" onPress={onRequestClose} />
      </View>
    </View>
  );
}
