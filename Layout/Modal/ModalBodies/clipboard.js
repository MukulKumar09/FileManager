import {View} from 'react-native';
import styles from '../../../styles/styles';

const clipboard = (dispatch, useSelector) => {
  const state = {clipboardItems: useSelector(state => state.clipboardItems)};
  const onRequestClose = () => {
    dispatch({type: 'POPMODALSTACK'});
  };
  return {
    icon: 'clipboard-outline',
    heading: `Clipboard`,
    subHeading: `Items ready to Copy`,
    onRequestClose,
    body: () => <View style={[styles.mediumGap]}></View>,
    buttons: [
      {
        title: 'Close',
        bordered: true,
        onPress: onRequestClose,
      },
    ],
  };
};
export default clipboard;
