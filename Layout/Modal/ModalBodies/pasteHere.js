import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import {useDispatch} from 'react-redux';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import HighlightButton from '../../../Common/HighlightButton/HighlightButton';
import SmallGrayText from '../../../Common/SmallGrayText/SmallGrayText';

export default function PasteHere({resolve, onRequestClose, items}) {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    resolve(1);
    dispatch({type: 'POPMODALSTACK'});
  };
  return (
    <View style={[styles.bigGap]}>
      {items.map(item => (
        <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
          {useIcon(item)}
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
        <BorderButton label="Cancel" onPress={onRequestClose} />
        <HighlightButton label="Confirm" onPress={() => handleConfirm()} />
      </View>
    </View>
  );
}
