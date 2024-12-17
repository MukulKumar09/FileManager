import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import DefaultButton from '../../../Common/DefaultButton/DefaultButton';
import handleDelete from '../../../Services/fileUtils/handleDelete';
import FileItem from '../../../Common/FileItem/FileItem';

export default function RecycleBin({onRequestClose}) {
  const dispatch = useDispatch();
  const state = {
    recycleBin: useSelector(state => state.recycleBin),
  };
  return (
    <View style={[styles.bigGap]}>
      <Text style={[styles.text, styles.textGreyed]}>
        {state.recycleBin.length} items
      </Text>
      {state.recycleBin.map(item => (
        <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
          <FileItem key={item.path} item={item} showPath={true} />
        </View>
      ))}
      <View style={[styles.rowLayout, styles.mediumGap]}>
        {state.recycleBin.length > 0 && (
          <>
            <DefaultButton
              label="Delete"
              onPress={() => {
                handleDelete(dispatch, state.recycleBin);
              }}
            />
            <DefaultButton
              label="Clear"
              onPress={() => {
                dispatch({type: 'SETRECYCLEBIN', payload: []});
              }}
            />
          </>
        )}
        <DefaultButton
          isHighlighted={true}
          label="Cancel"
          onPress={onRequestClose}
        />
      </View>
    </View>
  );
}
