import {Text} from 'react-native';
import styles from '../../styles/styles';

export default function SmallGrayText({style, children}) {
  return (
    <Text
      style={[styles.text, styles.textDisabled, styles.smallText, {...style}]}>
      {children}
    </Text>
  );
}
