import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import SmallGrayText from '../../../Common/SmallGrayText/SmallGrayText';
import HighlightButton from '../../../Common/HighlightButton/HighlightButton';
import handleDelete from '../../../Services/fileUtils/handleDelete';
import Icon from '../../Icon/Icon';

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
          <Icon item={item} />
          <View style={[styles.wide]}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text]}>
              {item.name}
            </Text>
            <SmallGrayText ellipsizeMode="tail" numberOfLines={2}>
              {item.path}
            </SmallGrayText>
          </View>
        </View>
      ))}
      <View style={[styles.rowLayout, styles.mediumGap]}>
        {state.recycleBin.length > 0 && (
          <>
            <BorderButton
              label="Delete"
              onPress={() => {
                handleDelete(dispatch, state.recycleBin);
              }}
            />
            <BorderButton
              label="Clear"
              onPress={() => {
                dispatch({type: 'SETRECYCLEBIN', payload: []});
              }}
            />
          </>
        )}
        <HighlightButton label="Cancel" onPress={onRequestClose} />
      </View>
    </View>
  );
}
