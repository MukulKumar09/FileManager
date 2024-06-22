import RNFS from 'react-native-fs';
export default async function MoveHandler(item, dest) {
    await RNFS.moveFile(item, dest)
}