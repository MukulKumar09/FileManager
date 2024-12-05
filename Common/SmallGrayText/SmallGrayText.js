import {Text} from 'react-native';
import styles from '../../styles/styles';

export default function SmallGrayText({props, children}) {
  return (
    <Text
      {...props}
      style={[styles.wide, styles.text, styles.textDisabled, styles.smallText]}>
      {children}
    </Text>
  );
}
