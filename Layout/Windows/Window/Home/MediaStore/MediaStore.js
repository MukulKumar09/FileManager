import {View} from 'react-native';
import Tile from '../../../../../Common/Tile/Tile';
import styles from '../../../../../styles/styles';
export default function MediaStore({pushBreadCrumb}) {
  const pushBreadCrumbCB = (name, ext) => {
    pushBreadCrumb({
      name,
      path: name,
      ext,
      useDefaultIcon: true,
      isMedia: true,
      isTabberPath: true,
    });
  };
  return (
    <>
      <View style={[styles.rowLayout, styles.bigGap]}>
        <Tile
          onPress={() => {
            pushBreadCrumbCB('Photos', 'camera-outline');
          }}
          icon="camera-outline"
          name="Photos"
        />
        <Tile
          onPress={() => {
            pushBreadCrumbCB('Videos', 'video-outline');
          }}
          icon="video-outline"
          name="Videos"
        />
      </View>
      <View style={[styles.rowLayout, styles.bigGap]}>
        <Tile
          onPress={() => {
            pushBreadCrumbCB('Audio', 'headphones');
          }}
          icon="headphones"
          name="Audio"
        />
        <Tile
          onPress={() => {
            pushBreadCrumbCB('Documents', 'file-document-outline');
          }}
          icon="file-document-outline"
          name="Documents"
        />
        <Tile
          onPress={() => {
            pushBreadCrumbCB('Downloads', 'download-outline');
          }}
          icon="download-outline"
          name="Downloads"
        />
      </View>
    </>
  );
}
