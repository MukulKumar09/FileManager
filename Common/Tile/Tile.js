import {Pressable, Text} from 'react-native';
import styles from '../../styles/styles';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

export default function Tile({name, icon, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, styles.padding, styles.mediumGap, styles.centered]}>
      <MaterialIcon name={icon} />
      <Text style={[styles.text, styles.oswald]}>{name}</Text>
    </Pressable>
  );
}
