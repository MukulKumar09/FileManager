import useCache from "./useCache";
import useCollectAllItems from "./useCollectAllItems";
import useCopyMoveItem from "./useCopyMoveItem";
import RNFS from 'react-native-fs';
export default async function useStartOperation(state, dispatch) {
    let collectedItems = await useCollectAllItems(state.clipboardItems, state.operationDest)
    let totalSize = 0
    collectedItems.forEach(item => {
        totalSize = totalSize + item["size"]
    })
    let completedSize = 0
    asdas
    const itemExistsModal = () => dispatch({
        type: "ITEMEXISTSMODAL"
    })
    const itemInOperation = (payload) => dispatch({
        type: "ITEMINOPERATION",
        payload: payload,
    })

    for (item of collectedItems) {
        if (state.operationType == -2) { break }
        dispatch({
            type: "SETPROGRESS",
            payload: ((completedSize / totalSize) * 100).toFixed(0)
        })
        itemInOperation(item["name"])
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
                    completedSize = completedSize + item["size"]
                    break
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
                    completedSize = completedSize + item["size"]
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
            completedSize = completedSize + item["size"]
        }
    }
    dispatch({
        type: "SETPROGRESS",
        payload: ((completedSize / totalSize) * 100).toFixed(0)
    })
    let toastMessage
    switch (state.operationType) {
        case -2: {
            toastMessage = "Operation Cancelled"
            break
        }
        case 0: {
            toastMessage = "Copy successful."
            break
        }
        case 1: {
            toastMessage = "Move successful."
            break
        }
    }
    dispatch({
        type: "OPERATIONWINDOW"
    })
    itemInOperation("")
    useCache(dispatch, state.operationDest)
    state.operationType &&
        useCache(dispatch, state.operationSource)
    dispatch({
        type: "TOAST",
        payload: toastMessage
    })
    dispatch({
        type: "OPERATIONTYPE",
        payload: -1,
    })
    dispatch({
        type: "CLEARCB"
    })

}