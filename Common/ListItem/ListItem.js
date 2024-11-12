import {Text, View, Pressable} from 'react-native';
import styles from '../../styles/styles';
import useIcon from '../../Hooks/useIcon';
import useNiceBytes from '../../Hooks/useNiceBytes';

export default function ListItem(props) {
  let mtime = new Date(props.item['mtime']);
  let ctime = new Date(props.item['ctime']);
  return (
    <Pressable
      style={[
        styles.rowLayout,
        styles.padding,
        props.selectedItems.some(item => item['path'] === props.item['path']) &&
          styles.listItemHighlight,
        props.selectedItem['path'] == props.item['path'] &&
          styles.listItemSelected,
      ]}
      onPressIn={() => props.setSelectedItem(props.item)}
      onPress={() => {
        props.handlePress(props.item);
      }}
      onLongPress={() => {
        props.handleLongPress(props.item);
      }}>
      <View style={[styles.rowLayout, styles.wide, styles.bigGap]}>
        <View style={{width: 30}}>{useIcon(props.item['fileType'])}</View>
        <View style={[styles.wide]}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.text]}>
            {props.item['name']}
          </Text>
          {Boolean(props.item.isFile) && (
            <Text style={[styles.text, styles.smallDarkText]}>
              {useNiceBytes(props.item['size'])}
            </Text>
          )}
        </View>
      </View>
      {Boolean(mtime.toLocaleDateString() !== 'Invalid Date') && (
        <View style={{width: 80, alignItems: 'flex-end', paddingStart: 20}}>
          <Text style={[styles.text, styles.smallDarkText]}>
            {mtime.toLocaleDateString()}
          </Text>
          <Text style={[styles.text, styles.smallDarkText]}>
            {mtime.toLocaleTimeString()}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
