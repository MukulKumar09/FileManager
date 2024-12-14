import {Suspense, memo} from 'react';
import getIcon from '../../Services/getIcon';
import styles from '../../styles/styles';
import {Text} from 'react-native';

function Icon({item}) {
  return (
    <Suspense fallback={<Text style={[styles.text]}>...</Text>}>
      {getIcon(item)}
    </Suspense>
  );
}
export default memo(Icon);
