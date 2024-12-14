import {Modal, Pressable, View} from 'react-native';
import styles from '../../../../styles/styles';
import MenuItem from '../../../../Common/MenuItem/MenuItem';

export default function Menu({menu, setMenu, setOption}) {
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
          title="Refresh"
          icon="reload"
          cb={() => {
            setMenu(false);
            setOption('refresh');
          }}
        />
        <MenuItem
          title="Recycle Bin"
          icon="delete-empty-outline"
          cb={() => setOption('recycleBin')}
        />
        <MenuItem
          title="Clipboard"
          icon="clipboard-outline"
          cb={() => setOption('clipboard')}
        />
        <MenuItem
          title="Properites"
          icon="details"
          cb={() => setOption('properties')}
        />
        <MenuItem
          title="About"
          icon="information-outline"
          cb={() => setOption('about')}
        />
      </View>
    </Modal>
  );
}
