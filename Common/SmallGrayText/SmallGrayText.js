import {Text} from 'react-native';
import styles from '../../styles/styles';

export default function SmallGrayText({style, children}) {
  return (
    <Text
      style={[styles.text, styles.textGreyed, styles.smallText, {...style}]}>
      {children}
    </Text>
  );
}
