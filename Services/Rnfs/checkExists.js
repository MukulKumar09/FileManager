import RNFS from 'react-native-fs';
export default async function checkExists(parent, name) {
  console.log('checking exists', name);
  const checkExists = await RNFS.exists(parent + '/' + name);
  return checkExists;
}
