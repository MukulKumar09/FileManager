import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch} from 'react-redux';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';

export default function OpenAs({resolve, onRequestClose}) {
  const dispatch = useDispatch();
  return (
    <View>
      <Pressable
        onPress={() => {}}
        style={[styles.rowLayout, styles.bigGap, styles.paddingVertical]}>
        <MaterialIcon name="text-box-outline" />
        <Text style={[styles.text]}>Text</Text>
      </Pressable>
      <Pressable
        onPress={() => {}}
        style={[styles.rowLayout, styles.bigGap, styles.paddingVertical]}>
        <MaterialIcon name="image" />
        <Text style={[styles.text]}>Image</Text>
      </Pressable>
      <Pressable
        onPress={() => {}}
        style={[styles.rowLayout, styles.bigGap, styles.paddingVertical]}>
        <MaterialIcon name="video-outline" />
        <Text style={[styles.text]}>Video</Text>
      </Pressable>
      <Pressable
        onPress={() => {}}
        style={[styles.rowLayout, styles.bigGap, styles.paddingVertical]}>
        <MaterialIcon name="music" />
        <Text style={[styles.text]}>Audio</Text>
      </Pressable>
    </View>
  );
}
