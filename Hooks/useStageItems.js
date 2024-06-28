import useDeleteItem from "./useDeleteItem";
import useCopyMoveItem from "./useCopyMoveItem";
import useNewItem from "./useNewItem";
import useCache from "./useCache";
export default function useStageItems(state, dispatch, selectedItems) {
    console.log("got", state.functionId)
    switch (state.functionId) {
        case 2: { //delete   
            dispatch({
                type: "DELETEMODAL"
            })
            const deleteAsync = async () => {
                let deleteDecision = await new Promise((resolve) => {
                    dispatch({
                        type: "DELETEPROMISERESOLVER",
                        payload: resolve
                    })
                })
                if (deleteDecision) {
                    dispatch({
                        type: "DELETEMODAL"
                    })
                    for (item of state.clipboardItems) {
                        await useDeleteItem(item["path"])
                    }
                    dispatch({
                        type: "CLEARCB"
                    })
                    await useCache(dispatch, state.tabs[state.currentTab]["path"])
                    dispatch({
                        type: "TOAST",
                        payload: 'Item(s) deleted.'
                    })
                } else {
                    dispatch({
                        type: "DELETEMODAL"
                    })
                    await useCache(dispatch, state.tabs[state.currentTab]["path"])
                    dispatch({
                        type: "TOAST",
                        payload: 'Item(s) deleted.'
                    })
                }
            }
            deleteAsync()
            break
        }
        case 3: { //rename
            dispatch({
                type: "OPERATIONTYPE",
                payload: 1,
            })
            dispatch({
                type: "ITEMINOPERATION",
                payload: selectedItems["name"],
            })
            const renameAsync = async () => {
                let completedSize = 0
                let totalSize = 0
                dispatch({
                    type: "INPUTMODAL",
                    payload: "Item"
                })
                selectedItems["itemDest"] = state.tabs[state.currentTab]["path"]
                selectedItems["name"] = await new Promise((resolve) => {
                    dispatch({
                        type: "INPUTPROMISERESOLVER",
                        payload: resolve
                    })
                })
                await useCopyMoveItem(
                    dispatch,
                    1,
                    completedSize,
                    totalSize,
                    selectedItems
                )
                dispatch({
                    type: "INPUTMODAL",
                    payload: 0
                })
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: -1,
                })
                useCache(dispatch, state.tabs[state.currentTab]["path"])
            }
            renameAsync()
            break
        }
        case 4: { //open selecteditem in newtab
            if (selectedItems.length == 0 || selectedItems.isFile()) {
                dispatch({
                    type: "TOAST",
                    payload: "No folder selected"
                })
            } else {
                dispatch({
                    type: "DUPLICATETAB",
                    payload: {
                        tabKey: state.tabCounter,
                        title: selectedItems["name"],
                        path: selectedItems["path"],
                        type: "filebrowser",
                    }
                })
                dispatch({
                    type: "SETCURRENTTAB",
                    payload: state.tabCounter
                })
                dispatch({
                    type: "INCREASETABCOUNTER",
                })
            }
            break
        }
        case 5: { //new folder
            dispatch({
                type: "ITEMINOPERATION",
                payload: "",
            })
            const newFolderAsync = async () => {
                let updatedName
                dispatch({
                    type: "INPUTMODAL",
                    payload: "Folder"
                })
                updatedName = await new Promise((resolve) => {
                    dispatch({
                        type: "INPUTPROMISERESOLVER",
                        payload: resolve
                    })
                })
                await useNewItem(state.tabs[state.currentTab]["path"], 0, updatedName)
                dispatch({
                    type: "INPUTMODAL",
                    payload: 0
                })
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: -1,
                })
                useCache(dispatch, state.tabs[state.currentTab]["path"])
            }
            newFolderAsync()
            break
        }
        case 6: { //new file
            dispatch({
                type: "ITEMINOPERATION",
                payload: "",
            })
            const newFileAsync = async () => {
                let updatedName
                dispatch({
                    type: "INPUTMODAL",
                    payload: "File"
                })
                updatedName = await new Promise((resolve) => {
                    dispatch({
                        type: "INPUTPROMISERESOLVER",
                        payload: resolve
                    })
                })
                await useNewItem(state.tabs[state.currentTab]["path"], 1, updatedName)
                dispatch({
                    type: "INPUTMODAL",
                    payload: 0
                })
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: -1,
                })
                useCache(dispatch, state.tabs[state.currentTab]["path"])
            }
            newFileAsync()
            break
        }
        case 7: {
            dispatch({
                type: "OPERATIONTYPE",
                payload: state.functionId,
            })
            dispatch({
                type: "OPERATIONDEST",
                payload: state.tabs[state.currentTab]["path"],
            })
            zipHandler()
            break
        }
    }
    dispatch({
        type: "FUNCTIONID",
        payload: -1
    })
    return [1]
}