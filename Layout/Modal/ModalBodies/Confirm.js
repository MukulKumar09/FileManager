import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch} from 'react-redux';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import HighlightButton from '../../../Common/HighlightButton/HighlightButton';

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
        <BorderButton label="Cancel" onPress={onRequestClose} />
        <HighlightButton label="Confirm" onPress={() => handleConfirm()} />
      </View>
    </View>
  );
}
