import {Modal, View} from 'react-native';
import styles from '../../../../styles/styles';
import MenuItem from '../../../../Common/MenuItem/MenuItem';

export default function Menu({setOption}) {
  return (
    <Modal transparent={true}>
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
          cb={() => {
            setOption('recycleBin');
          }}
        />
        <MenuItem
          title="Clipboard"
          icon="clipboard-outline"
          cb={() => {
            setOption('clipboard');
          }}
        />
        <MenuItem
          title="About"
          icon="information-outline"
          cb={() => {
            setOption('about');
          }}
        />
      </View>
    </Modal>
  );
}
