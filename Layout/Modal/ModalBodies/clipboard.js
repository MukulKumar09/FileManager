import {View, Text} from 'react-native';
import styles from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';

const clipboard = (dispatch, useSelector) => {
  const state = {clipboardItems: useSelector(state => state.clipboardItems)};
  const {items, type} = state.clipboardItems;
  const onRequestClose = () => {
    dispatch({type: 'POPMODALSTACK'});
  };
  return {
    icon: 'clipboard-outline',
    heading: `Clipboard`,
    subHeading: `Items ready to ${type}`,
    onRequestClose,
    body: () => (
      <View style={[styles.mediumGap]}>
        {items.map(item => (
          <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
            {useIcon(item)}
            <View style={[styles.wide]}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.text]}>
                {item.name}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={[styles.text, styles.smallText, styles.textDisabled]}>
                {item.path}
              </Text>
            </View>
          </View>
        ))}
      </View>
    ),
    buttons: [
      {
        title: 'Close',
        bordered: true,
        onPress: onRequestClose,
      },
    ],
  };
};
export default clipboard;
