import RNFS from 'react-native-fs';
export default async function useCollectAllItem(clipboardItems, operationDest) {
    let collectedItems = []
    let itemDest
    const deepCollect = async (item) => {
        if (item.isDirectory()) {
            if (operationDest.includes(item["path"])) { //check id dest inside source
            } else {
                itemDest = itemDest + "/" + item["name"]
                let dirContents = await RNFS.readDir(item["path"])
                for (const dirItem of dirContents) {
                    await deepCollect(dirItem)
                }
            }
        } else {
            item["itemDest"] = itemDest
            collectedItems.push(item)
        }
    }
    for (let i = 0; i < clipboardItems.length; i++) {
        itemDest = operationDest
        await deepCollect(clipboardItems[i])
    }
    return collectedItems
}