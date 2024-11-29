import {Text, View} from 'react-native';
import styles from '../styles/styles';
import useIcon from '../Hooks/useIcon';

export default function detectDropLocation(
  tabs,
  dragNDropIcon,
  tabbarLayout,
  tabLayouts,
  scrollOffset,
  dispatch,
) {
  for (i in tabLayouts) {
    if (dragNDropIcon.droppedCoordinates?.y >= tabbarLayout.y) {
      const start = tabLayouts[i].x;
      const end = tabLayouts[i].xWidth;
      const droppedC = dragNDropIcon.droppedCoordinates?.x + scrollOffset;
      if (start <= droppedC && droppedC <= end) {
        dispatch({
          type: 'SETCURRENTTAB',
          payload: i,
        });
        const data = {
          icon: 'content-paste',
          heading: `Copy ${dragNDropIcon.items.length} Items Here?`,
          subHeading: `To: ${tabs[i].item.path}`,
          body: () => (
            <View style={[styles.mediumGap]}>
              {dragNDropIcon.items.map(item => (
                <View
                  key={item.path}
                  style={[styles.rowLayout, styles.smallGap]}>
                  {useIcon(item)}
                  <View>
                    <Text style={[styles.text]}>{item.name}</Text>
                    <Text
                      style={[
                        styles.text,
                        styles.smallText,
                        styles.textDisabled,
                      ]}>
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
              onPress: () =>
                dispatch({
                  type: 'POPMODALSTACK',
                }),
            },
            {title: 'Done', pillHighlight: true},
          ],
        };

        dispatch({
          type: 'PUSHMODALSTACK',
          payload: data,
        });
        break;
      }
    }
  }
}
