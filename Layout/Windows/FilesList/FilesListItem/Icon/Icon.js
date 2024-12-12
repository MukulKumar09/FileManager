import {Suspense, memo} from 'react';
import getIcon from '../../../../../Hooks/getIcon';
import styles from '../../../../../styles/styles';
import {Text} from 'react-native';

function Icon({path, ext, type}) {
  return (
    <Suspense fallback={<Text style={[styles.text]}>...</Text>}>
      {getIcon({path, ext, type})}
    </Suspense>
  );
}
export default memo(Icon);
