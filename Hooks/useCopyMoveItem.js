import RNFS from 'react-native-fs';
export default async function useCopyMoveItem(operationType, item, dest) {
    if (operationType) {
        await RNFS.moveFile(item, dest)
        return 1
    }
    else {
        await RNFS.copyFile(item, dest)
        return 1
    }
}