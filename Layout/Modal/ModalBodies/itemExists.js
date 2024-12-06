import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import {useDispatch} from 'react-redux';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import HighlightButton from '../../../Common/HighlightButton/HighlightButton';
import SmallGrayText from '../../../Common/SmallGrayText/SmallGrayText';
import askToRename from '../../../Services/askToRename';

const ItemExists = ({resolve, item, onRequestClose}) => {
  console.log(item);
  const dispatch = useDispatch();

  return (
    <View style={[styles.bigGap]}>
      <View
        style={[
          styles.rowLayout,
          styles.mediumGap,
          {alignItems: 'flex-start'},
        ]}>
        {useIcon(item)}
        <View style={[styles.wide]}>
          <Text ellipsizeMode="tail" numberOfLines={5} style={[styles.text]}>
            {item.name}
          </Text>
          <SmallGrayText ellipsizeMode="tail" numberOfLines={5}>
            {item.path}
          </SmallGrayText>
        </View>
      </View>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <BorderButton label="Skip" onPress={() => onRequestClose()} />
        <BorderButton
          label="Overwrite"
          onPress={() => {
            resolve('/overwrite');
            dispatch({type: 'POPMODALSTACK'});
          }}
        />
        <HighlightButton
          label="Rename"
          onPress={async () => resolve(askToRename(dispatch, item, resolve))}
        />
      </View>
    </View>
  );
};
export default ItemExists;
