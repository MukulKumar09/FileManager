import useCollectAllItems from "./useCollectAllItems";
import useCopyItem from "./useCopyItem";
import useMoveItem from "./useMoveItem";
import RNFS from 'react-native-fs';
export default async function useStartOperation(state, dispatch) {
    let collectedItems = await useCollectAllItems(state.clipboardItems, state.operationDest)
    let totalSize = 0
    collectedItems.forEach(item => {
        totalSize = totalSize + item["size"]
    })
    let completedSize = 0
    for (item of collectedItems) {
        if (state.operationType == -2) { break }
        dispatch({
            type: "SETPROGRESS",
            payload: ((completedSize / totalSize) * 100).toFixed(0)
        })
        dispatch({
            type: "ITEMINOPERATION",
            payload: item["name"]
        })
        if (await RNFS.exists(state.operationDest + "/" + item["name"])) {
            dispatch({
                type: "ITEMEXISTSMODAL"
            })
            let decision = await new Promise((resolve) => {
                dispatch({
                    type: "ITEMEXISTSPROMISERESOLVER",
                    payload: resolve
                })
            })
            switch (decision) {
                case 0: { //skip
                    dispatch({
                        type: "TOAST",
                        payload: "Item skipped"
                    })
                    dispatch({
                        type: "ITEMEXISTSMODAL"
                    })
                    break
                }
                case 1: { //overwrite
                    dispatch({
                        type: "ITEMEXISTSMODAL"
                    })
                    if (state.operationType)
                        await useMoveItem(item["path"], state.operationDest)
                    else
                        await useCopyItem(item["path"], state.operationDest)
                    break
                }
                default: { //rename
                    if (state.operationType)
                        await useMoveItem(item["path"], decision)
                    else
                        await useCopyItem(item["path"], decision)
                    break
                }
            }
        } else {
            checkProgress = setInterval(async () => {
                let currentItem = await RNFS.stat(state.operationDest + "/" + item["name"])
                dispatch({
                    type: "SETPROGRESS",
                    payload: (((completedSize + currentItem["size"]) / totalSize) * 100).toFixed(0)
                })
            }, 2000);
            if (state.operationType)
                await useMoveItem(item["path"], state.operationDest + "/" + item["name"])
            else
                await useCopyItem(item["path"], state.operationDest + "/" + item["name"])
        }
        completedSize = completedSize + item["size"]
        clearInterval(checkProgress);
    }
    dispatch({
        type: "OPERATIONWINDOW"
    })
    dispatch({
        type: "ITEMINOPERATION",
        payload: ""
    })
    dispatch({
        type: "OPERATIONTYPE",
        payload: -1,
    })
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
        type: "TOAST",
        payload: toastMessage
    })
    dispatch({
        type: "CLEARCB"
    })
}