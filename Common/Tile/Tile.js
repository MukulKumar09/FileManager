import {Pressable, Text} from 'react-native';
import styles from '../../styles/styles';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

export default function Tile({name, icon, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.rowLayout,
        styles.pill,
        styles.wide,
        styles.padding,
        styles.mediumGap,
        styles.centered,
      ]}>
      <MaterialIcon name={icon} color="white" />
      <Text style={[styles.text, styles.textGreyed, styles.oswald]}>
        {name}
      </Text>
    </Pressable>
  );
}
