import {Text, View} from 'react-native';
import styles from '../../../styles/styles';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import {bytesToSize} from '../../../Services/fileUtils/bytesToSize';
import {unixToDate} from '../../../Services/fileUtils/unixToDate';

export default function Properties({resolve, onRequestClose, items}) {
  let size = 0,
    name,
    type,
    mtime = null,
    path = items[0].parent;
  if (items.length == 1) {
    name = items[0].name;
    type = items[0].type;
    type == 'dir' ? (size = null) : (size = items[0].size);
    mtime = items[0].mtime;
  } else {
    name = '[Multiple items...]';
    type = 'Various types';
    items.map(item => {
      size += item.size;
    });
  }

  return (
    <View style={[styles.bigGap]}>
      <Text style={[styles.text]}>{items.length} items selected</Text>
      <View style={[styles.rowLayout]}>
        <Text style={[styles.text, styles.textDisabled, {width: '40%'}]}>
          Name:
        </Text>
        <Text style={[styles.text, styles.wide]}>{name}</Text>
      </View>
      <View style={[styles.rowLayout]}>
        <Text style={[styles.text, styles.textDisabled, {width: '40%'}]}>
          Type:
        </Text>
        <Text style={[styles.text, styles.wide]}>{type}</Text>
      </View>
      {Boolean(size) && (
        <View style={[styles.rowLayout]}>
          <Text style={[styles.text, styles.textDisabled, {width: '40%'}]}>
            Size:
          </Text>
          <Text style={[styles.text, styles.wide]}>{bytesToSize(size)}</Text>
        </View>
      )}
      <View style={[styles.rowLayout]}>
        <Text style={[styles.text, styles.textDisabled, {width: '40%'}]}>
          Path:
          {/* <Pressable>
            <SmallMaterialIcon name="content-copy" color={grey} />
          </Pressable> */}
        </Text>
        <Text style={[styles.text, styles.wide]}>{path}</Text>
      </View>
      {Boolean(mtime) && (
        <View style={[styles.rowLayout]}>
          <Text style={[styles.text, styles.textDisabled, {width: '40%'}]}>
            Modified Date:
          </Text>
          <Text style={[styles.text, styles.wide]}>{unixToDate(mtime)}</Text>
        </View>
      )}

      <BorderButton label="Close" onPress={onRequestClose} />
    </View>
  );
}