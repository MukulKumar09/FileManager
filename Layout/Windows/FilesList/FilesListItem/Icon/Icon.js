import {Suspense, memo} from 'react';
import getIcon from '../../../../../Hooks/getIcon';
import styles from '../../../../../styles/styles';
import {Text} from 'react-native';

function Icon({path, ext}) {
  return (
    <Suspense fallback={<Text style={[styles.text]}>...</Text>}>
      {getIcon({path, ext})}
    </Suspense>
  );
}
export default memo(Icon);
