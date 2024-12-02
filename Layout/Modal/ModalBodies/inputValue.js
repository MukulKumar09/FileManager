import {TextInput, View} from 'react-native';
import styles from '../../../styles/styles';
import checkExists from '../../../Services/Rnfs/checkExists';

const inputValue = (resolve, dispatch, params) => {
  const {destFilePath, name} = params[0];
  let value = name;
  const onRequestClose = () => {
    resolve('/');
    dispatch({type: 'POPMODALSTACK'});
  };

  async function checkNameAvailable() {
    const isExists = await checkExists(destFilePath + value);
    if (isExists == true) {
      dispatch({type: 'TOAST', payload: 'This name already exists!'});
    } else {
      dispatch({type: 'POPMODALSTACK'});
      resolve(value);
    }
  }

  return {
    icon: 'file-edit-outline',
    heading: `Enter Name`,
    subHeading: `For: ${name}`,
    onRequestClose,
    body: () => (
      <View style={[styles.mediumGap]}>
        <TextInput
          defaultValue={value}
          onChangeText={text => {
            value = text;
          }}
          style={[styles.pill, styles.padding, styles.text, styles.bordered]}
        />
      </View>
    ),
    buttons: [
      {
        title: 'Cancel',
        bordered: true,
        onPress: onRequestClose,
      },
      {
        title: 'Rename',
        pillHighlight: true,
        onPress: () => checkNameAvailable(),
      },
    ],
  };
};
export default inputValue;
