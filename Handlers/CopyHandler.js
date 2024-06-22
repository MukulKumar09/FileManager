import RNFS from 'react-native-fs';
export default async function CopyHandler(item, dest) {
    await RNFS.copyFile(item, dest)
}