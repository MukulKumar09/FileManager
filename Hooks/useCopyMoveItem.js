import RNFS from 'react-native-fs';
export default async function useCopyMoveItem(dispatch, operationType, completedSize, totalSize, item) {
    checkProgress = setInterval(async () => {
        let currentItem = await RNFS.stat(item["itemDest"] + "/" + item["name"])
        dispatch({
            type: "SETPROGRESS",
            payload: (((completedSize + currentItem["size"]) / totalSize) * 100).toFixed(0)
        })
    }, 2000);
    RNFS.mkdir(item["itemDest"])
    if (operationType == 1) {
        await RNFS.moveFile(item["path"], item["itemDest"] + "/" + item["name"])
        clearInterval(checkProgress);
        return 1
    }
    else {
        await RNFS.copyFile(item["path"], item["itemDest"] + "/" + item["name"])
        clearInterval(checkProgress);
        return 1
    }

}