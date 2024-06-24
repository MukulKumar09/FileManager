import RNFS from 'react-native-fs';
export default async function useCopyMoveItem(dispatch, operationType, completedSize, totalSize, item, dest) {
    checkProgress = setInterval(async () => {
        let currentItem = await RNFS.stat(dest)
        dispatch({
            type: "SETPROGRESS",
            payload: (((completedSize + currentItem["size"]) / totalSize) * 100).toFixed(0)
        })
    }, 2000);
    if (operationType) {
        await RNFS.moveFile(item, dest)
        clearInterval(checkProgress);
        return 1
    }
    else {
        await RNFS.copyFile(item, dest)
        clearInterval(checkProgress);
        return 1
    }

}