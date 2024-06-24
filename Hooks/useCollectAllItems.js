import RNFS from 'react-native-fs';
export default async function useCollectAllItem(clipboardItems, operationDest) {
    let collectedItems = []
    const deepCollect = async (item) => {
        if (item.isDirectory()) {
            if (operationDest.includes(item["path"])) { //check id dest inside source
            } else {
                let dirContents = await RNFS.readDir(item["path"])
                for (const dirItem of dirContents) {
                    await deepCollect(dirItem)
                }
            }
        } else {
            collectedItems.push(item)
        }
    }
    for (let i = 0; i < clipboardItems.length; i++) {
        await deepCollect(clipboardItems[i])
    }
    return collectedItems
}