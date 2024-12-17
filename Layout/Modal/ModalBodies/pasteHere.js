import {View} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch} from 'react-redux';
import DefaultButton from '../../../Common/DefaultButton/DefaultButton';
import FilesList from '../../../Common/FileItem/FileItem';

export default function PasteHere({resolve, onRequestClose, items}) {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    resolve(1);
    dispatch({type: 'POPMODALSTACK'});
  };
  return (
    <View style={[styles.bigGap]}>
      {items.map(item => (
        <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
          <FilesList key={item.path} item={item} showSize={true} />
        </View>
      ))}
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
