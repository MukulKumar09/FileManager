import {Modal, Pressable, View} from 'react-native';
import styles from '../../../../styles/styles';
import MenuItem from '../../../../Common/MenuItem/MenuItem';

export default function Menu({menu, setMenu}) {
  return (
    <Modal
      visible={Boolean(menu)}
      onRequestClose={() => setMenu(false)}
      transparent={true}>
      <Pressable
        onPress={() => setMenu(false)}
        style={[styles.modalBackground, {backgroundColor: 'transparent'}]}
      />
      <View
        style={[
          styles.pill,
          {
            width: '50%',
            position: 'absolute',
            right: 15,
            bottom: 100,
            elevation: 5,
          },
        ]}>
        <MenuItem
          title="Recycle Bin"
          icon="delete-empty-outline"
          cb={() => setMenu('recycleBin')}
        />
        <MenuItem
          title="Clipboard"
          icon="clipboard-outline"
          cb={() => setMenu('clipboard')}
        />
        <MenuItem
          title="About"
          icon="information-outline"
          cb={() => setMenu('about')}
        />
      </View>
    </Modal>
  );
}
