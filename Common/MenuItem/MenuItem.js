import {Pressable, Text} from 'react-native';
import styles from '../../styles/styles';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

export default function MenuItem({title, icon, cb}) {
  return (
    <Pressable
      onPress={() => cb()}
      style={[styles.rowLayout, styles.padding, styles.bigGap, styles.text]}>
      <MaterialIcon name={icon} />
      <Text style={[styles.text]}>{title}</Text>
    </Pressable>
  );
}
