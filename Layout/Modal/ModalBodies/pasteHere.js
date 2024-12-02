import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import {useDispatch} from 'react-redux';

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
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={[styles.text, styles.smallText, styles.textDisabled]}>
              {item.path}
            </Text>
          </View>
        </View>
      ))}
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <Pressable
          onPress={onRequestClose}
          style={[
            styles.pill,
            styles.bordered,
            styles.wide,
            styles.centered,
            styles.padding,
          ]}>
          <Text style={[styles.text]}>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={() => handleConfirm()}
          style={[
            styles.pill,
            styles.pillHighlight,
            styles.wide,
            styles.centered,
            styles.padding,
          ]}>
          <Text style={[styles.text]}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}
