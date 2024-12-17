import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch} from 'react-redux';
import DefaultButton from '../../../Common/DefaultButton/DefaultButton';

export default function Confirm({resolve, onRequestClose, description}) {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    resolve(1);
    dispatch({type: 'POPMODALSTACK'});
  };
  return (
    <View style={[styles.bigGap]}>
      <Text style={[styles.text]}>{description}</Text>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <DefaultButton label="Cancel" onPress={onRequestClose} />
        <DefaultButton
          isHighlighted={true}
          label="Confirm"
          onPress={() => handleConfirm()}
        />
      </View>
    </View>
  );
}
