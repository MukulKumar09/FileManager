import {View, Text, ActivityIndicator} from 'react-native';
import styles, {textColor} from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';

const progress = (
  dispatch,
  operation = 'Loading',
  item = {name: 'Loading', ext: '/'},
  itemProgress = '0%',
  totalProgress = '0%',
) => {
  const onRequestClose = () => {
    dispatch({
      type: 'POPMODALSTACK',
    });
  };
  return {
    icon: 'progress-clock',
    heading: `${operation} in progress...`,
    onRequestClose,
    body: () => (
      <View style={[styles.mediumGap]}>
        <View style={[styles.rowLayout, styles.mediumGap]}>
          {useIcon(item)}
          <Text ellipsizeMode="tail" numberOfLines={5} style={[styles.text]}>
            {item.name}
          </Text>
        </View>
        <View style={[styles.wide]}>
          <View
            style={[
              styles.rowLayout,
              styles.mediumGap,
              styles.pill,
              styles.pillHighlight,
              {
                width: itemProgress,
                padding: 5,
                alignItems: 'center',
              },
            ]}>
            <ActivityIndicator color={textColor} />
            <Text style={[styles.text, styles.smallText]}>{itemProgress}</Text>
          </View>
        </View>
        <Text style={[styles.text]}>Progress</Text>
        <View style={[styles.wide]}>
          <View
            style={[
              styles.pill,
              styles.pillHighlight,
              {
                width: totalProgress,
                padding: 5,
                alignItems: 'center',
              },
            ]}>
            <Text style={[styles.text, styles.smallText]}>{totalProgress}</Text>
          </View>
        </View>
      </View>
    ),
    buttons: [
      {
        title: 'Cancel',
        bordered: true,
        onPress: onRequestClose,
      },
    ],
  };
};
export default progress;
