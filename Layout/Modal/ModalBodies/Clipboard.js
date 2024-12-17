import {Text, View} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import DefaultButton from '../../../Common/DefaultButton/DefaultButton';
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
          <FileItem key={item.path} item={item} showPath={true} />
        </View>
      ))}
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <DefaultButton
          label="Clear"
          onPress={() => {
            dispatch({type: 'CLEARCB'});
          }}
        />
        <DefaultButton label="Close" onPress={onRequestClose} />
      </View>
    </View>
  );
}
