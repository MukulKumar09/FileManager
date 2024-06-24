import useCollectAllItems from "./useCollectAllItems";
import useCopyItem from "./useCopyItem";
import useMoveItem from "./useMoveItem";
import RNFS from 'react-native-fs';
export default async function useStartOperation(state, dispatch) {
    let collectedItems = await useCollectAllItems(state.clipboardItems, state.operationDest)
    for (item of collectedItems) {
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
            if (state.operationType)
                await useMoveItem(item["path"], state.operationDest + "/" + item["name"])
            else
                await useCopyItem(item["path"], state.operationDest + "/" + item["name"])
        }
    }

}