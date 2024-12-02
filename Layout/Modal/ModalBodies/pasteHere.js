import {Text, View} from 'react-native';
import styles from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';

const pasteHere = (resolve, dispatch, params) => {
  const items = params[0];
  const destTab = params[1];
  const onRequestClose = () => {
    dispatch({type: 'POPMODALSTACK'});
    resolve(0);
  };
  return {
    icon: 'content-paste',
    heading: `Copy ${items.length} Items Here?`,
    subHeading: `To: ${destTab.item.path + '/'}`,
    onRequestClose,
    body: () => (
      <View style={[styles.mediumGap]}>
        {items.map(item => (
          <View key={item.path} style={[styles.rowLayout, styles.smallGap]}>
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
        title: 'Cancel',
        bordered: true,
        onPress: onRequestClose,
      },
      {
        title: 'Done',
        pillHighlight: true,
        onPress: () => {
          dispatch({type: 'POPMODALSTACK'});
          resolve(1);
        },
      },
    ],
  };
};
export default pasteHere;
