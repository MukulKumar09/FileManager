import RNFS from 'react-native-fs';
export default function getStorageName(parent) {
  if (parent == RNFS.ExternalStorageDirectoryPath) {
    return 'Internal Storage';
  } else {
    return 'External Storage';
  }
}
