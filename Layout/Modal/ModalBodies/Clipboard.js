import {Text, View} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import FileItem from '../../../Common/FileItem/FileItem';

export default function Clipboard({onRequestClose}) {
  const dispatch = useDispatch();
  const state = {
    clipboardItems: useSelector(state => state.clipboardItems),
  };
  return (
    <View style={[styles.bigGap]}>
      <Text style={[styles.text, styles.textGreyed]}>
        {state.clipboardItems.items.length} items
      </Text>
      {state.clipboardItems.items.map(item => (
        <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
          <FileItem key={item.path} item={item} showSize={true} />
        </View>
      ))}
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <BorderButton
          label="Clear"
          onPress={() => {
            dispatch({type: 'CLEARCB'});
          }}
        />
        <BorderButton label="Close" onPress={onRequestClose} />
      </View>
    </View>
  );
}
