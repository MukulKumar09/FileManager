import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import modalPromise from '../../../Actions/modalPromise';
import InputValue from './InputValue';
import {useDispatch} from 'react-redux';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import HighlightButton from '../../../Common/HighlightButton/HighlightButton';

const ItemExists = ({resolve, item, onRequestClose}) => {
  const dispatch = useDispatch();
  const askToRename = async () => {
    let newNameForExistingItem = await modalPromise(
      dispatch,
      InputValue,
      {item},
      {
        icon: <MaterialIcon name="file-edit-outline" />,
        heading: `Enter New Name`,
        subHeading: `For: ${item.name}`,
      },
    );
    if (newNameForExistingItem !== null) {
      resolve(newNameForExistingItem);
    }
  };

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
          <Text
            ellipsizeMode="tail"
            numberOfLines={5}
            style={[styles.text, styles.smallText, styles.textDisabled]}>
            {item.path}
          </Text>
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
        <HighlightButton label="Rename" onPress={() => askToRename()} />
      </View>
    </View>
  );
};
export default ItemExists;
