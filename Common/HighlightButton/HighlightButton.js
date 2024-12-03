import {Pressable, Text} from 'react-native';
import styles from '../../styles/styles';

export default function HighlightButton({label, btnStyle, txtStyle, ...props}) {
  return (
    <Pressable
      {...props}
      style={[
        btnStyle,
        styles.pill,
        styles.pillHighlight,
        styles.wide,
        styles.centered,
        styles.padding,
      ]}>
      <Text style={[txtStyle, styles.text]}>{label}</Text>
    </Pressable>
  );
}
