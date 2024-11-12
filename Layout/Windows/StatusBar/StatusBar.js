import {Text, View} from 'react-native';
import styles from '../../styles/styles';

export default function StatusBar(props) {
  return (
    <View
      style={[
        styles.rowLayout,
        styles.pill,
        styles.padding,
        styles.paddingCloseBottom,
        {
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: '#979899',
            fontSize: 10,
          },
        ]}>
        {props.selectedItems.length} items selected
      </Text>
      <View style={[styles.rowLayout, styles.bigGap]}>
        <Text
          style={[
            styles.text,
            {
              color: '#979899',
              fontSize: 10,
              textDecorationLine: 'underline',
            },
          ]}
          onPress={() => {
            props.setSelectedItems([]);
            props.setSelectedItem([]);
          }}>
          Deselect All
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: '#979899',
              fontSize: 10,
              textDecorationLine: 'underline',
            },
          ]}
          onPress={() => props.setSelectedItems(props.filesList)}>
          Select All
        </Text>
      </View>
    </View>
  );
}
