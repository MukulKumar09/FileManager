import {View, TextInput, Pressable, Text} from 'react-native';
import MaterialIcon from '../../../../Common/MaterialIcon/MaterialIcon';
import styles from '../../../../styles/styles';

export default function FilterBar({filterBar, setFilterBar}) {
  return (
    <View
      style={[
        styles.rowLayout,
        styles.pill,
        styles.bordered,
        {
          position: 'absolute',
          zIndex: 10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 15,
          overflow: 'hidden',
        },
      ]}>
      <TextInput
        value={filterBar}
        placeholder="Search Files..."
        onChangeText={text => {}}
        style={[styles.text, styles.smallText, styles.wide]}
      />
      <Pressable
        onPress={() => {
          setFilterBar(false);
        }}>
        <MaterialIcon name="close-circle-outline" />
      </Pressable>
    </View>
  );
}
