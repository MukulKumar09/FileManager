import useCopyMoveItem from "./useCopyMoveItem";
import RNFS from 'react-native-fs';
export default async function useStartOperation(state, dispatch, item, itemExistsModal, itemInOperation, completedSize, totalSize) {
    dispatch({
        type: "SETPROGRESS",
        payload: ((completedSize / totalSize) * 100).toFixed(0)
    })
    itemInOperation(item["name"])
    // if (await RNFS.exists(item["path"]))
    if (await RNFS.exists(item["itemDest"] + "/" + item["name"])) {
        itemExistsModal()
        let decision = await new Promise((resolve) => {
            dispatch({
                type: "ITEMEXISTSPROMISERESOLVER",
                payload: resolve
            })
        })
        switch (decision) {
            case 0: { //skip
                itemExistsModal()
                dispatch({
                    type: "TOAST",
                    payload: "Item skipped"
                })
                break
            }
            case 1: { //overwrite
                itemExistsModal()
                await useCopyMoveItem(
                    dispatch,
                    state.operationType,
                    completedSize,
                    totalSize,
                    item
                )
                return completedSize + item["size"]
            }
            default: { //rename
                itemExistsModal()
                item["name"] = decision
                await useCopyMoveItem(
                    dispatch,
                    state.operationType,
                    completedSize,
                    totalSize,
                    item
                )
                return completedSize + item["size"]
            }
        }
    } else {
        await useCopyMoveItem(
            dispatch,
            state.operationType,
            completedSize,
            totalSize,
            item
        )
        return completedSize + item["size"]
    }
}