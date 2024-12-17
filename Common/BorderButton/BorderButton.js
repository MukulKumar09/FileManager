import {Pressable, Text} from 'react-native';
import styles from '../../styles/styles';

export default function BorderButton({
  label,
  btnStyle,
  isHighlighted,
  txtStyle,
  ...props
}) {
  return (
    <Pressable
      {...props}
      style={[
        btnStyle,
        styles.pill,
        styles.bordered,
        isHighlighted && styles.pillHighlight,
        styles.wide,
        styles.centered,
        styles.padding,
      ]}>
      <Text style={[txtStyle, styles.text]}>{label}</Text>
    </Pressable>
  );
}
