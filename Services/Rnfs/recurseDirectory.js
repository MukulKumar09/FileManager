import RNFS from 'react-native-fs';
export default async function recurseDirectory(item) {
  const {path} = item;
  if (path.type == 'dir' || path.isDirectory() == 1) {
    const dirItems = await RNFS.readDir(path);
  }
}
