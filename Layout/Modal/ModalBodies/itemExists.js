import {Text, View} from 'react-native';
import styles from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import modalPromise from '../../../Actions/modalPromise';
import inputValue from './inputValue';

const itemExists = (resolve, dispatch, params) => {
  const item = params[0];
  const onRequestClose = () => {
    dispatch({type: 'POPMODALSTACK'});
    resolve('/skip');
  };
  const askToRename = async () => {
    let newNameForExistingItem = await modalPromise(dispatch, inputValue, item);
    if (newNameForExistingItem !== '/') {
      resolve(newNameForExistingItem);
    }
  };

  return {
    icon: 'alert-outline',
    heading: `Item Already Exists!`,
    subHeading: `In Destination: ${item.destFilePath}`,
    onRequestClose,
    body: () => (
      <View style={[styles.mediumGap]}>
        <View
          key={item.path}
          style={[
            styles.rowLayout,
            styles.smallGap,
            {alignItems: 'flex-start'},
          ]}>
          {useIcon(item)}
          <View style={[styles.wide]}>
            <Text ellipsizeMode="tail" numberOfLines={5} style={[styles.text]}>
              {item.name}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={5}
              style={[styles.text, styles.smallText, styles.textDisabled]}>
              {item.path}
            </Text>
          </View>
        </View>
      </View>
    ),
    buttons: [
      {
        title: 'Skip',
        bordered: true,
        onPress: onRequestClose,
      },
      {
        title: 'Overwrite',
        bordered: true,
        onPress: () => {
          dispatch({type: 'POPMODALSTACK'});
          resolve('/overwrite');
        },
      },
      {
        title: 'Rename',
        pillHighlight: true,
        onPress: askToRename,
      },
    ],
  };
};
export default itemExists;
