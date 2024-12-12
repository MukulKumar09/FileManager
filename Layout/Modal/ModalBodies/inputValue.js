import {TextInput, View, Pressable, Text} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch} from 'react-redux';
import {useCallback, useState} from 'react';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import HighlightButton from '../../../Common/HighlightButton/HighlightButton';
import checkNameValid from '../../../Services/fileUtils/checkNameValid';

const InputValue = ({resolve, item, onRequestClose}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const {name} = item;
  let value = name;

  async function verifyName() {
    const isValid = await checkNameValid(value, item, setError);
    if (isValid) {
      resolve(value);
      dispatch({type: 'POPMODALSTACK'});
    }
  }

  return (
    <View style={[styles.bigGap]}>
      {error && <Text style={[styles.text]}>{error}</Text>}
      <TextInput
        defaultValue={value}
        onChangeText={text => {
          setError(false);
          value = text;
        }}
        style={[
          styles.pill,
          styles.padding,
          styles.text,
          styles.bordered,
          error && {borderColor: 'darkred'},
        ]}
      />
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <BorderButton label="Cancel" onPress={() => onRequestClose()} />
        <HighlightButton label="Confirm" onPress={() => verifyName()} />
      </View>
    </View>
  );
};
export default InputValue;
