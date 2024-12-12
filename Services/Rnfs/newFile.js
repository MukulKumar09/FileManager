import RNFS from 'react-native-fs';
export default async function newFile(destPath, name) {
  return await RNFS.writeFile(destPath + '/' + name, '', 'utf8');
}
