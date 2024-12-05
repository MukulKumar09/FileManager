import {TextInput, View, Pressable, Text} from 'react-native';
import styles from '../../../styles/styles';
import checkExists from '../../../Services/Rnfs/checkExists';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import HighlightButton from '../../../Common/HighlightButton/HighlightButton';

const InputValue = ({resolve, item, onRequestClose}) => {
  const dispatch = useDispatch();
  const [isNameExists, setIsNameExists] = useState(false);
  const {name, destFilePath} = item;
  let value = name;
  async function checkNameAvailable() {
    const isExists = await checkExists(destFilePath + value);
    if (isExists == true) {
      setIsNameExists(true);
    } else {
      resolve(value);
      dispatch({type: 'POPMODALSTACK'});
    }
  }

  return (
    <View style={[styles.bigGap]}>
      {isNameExists && <Text style={[styles.text]}>Name already exists!</Text>}
      <TextInput
        defaultValue={value}
        onChangeText={text => {
          setIsNameExists(false);
          value = text;
        }}
        style={[
          styles.pill,
          styles.padding,
          styles.text,
          styles.bordered,
          isNameExists && {borderColor: 'darkred'},
        ]}
      />
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <BorderButton label="Cancel" onPress={() => onRequestClose()} />
        <HighlightButton label="Rename" onPress={() => checkNameAvailable()} />
      </View>
    </View>
  );
};
export default InputValue;
