import useCopyMoveItem from "./useCopyMoveItem";
import useNewItem from "./useNewItem";
import useCache from "./useCache";
export default function useStageItems(state, dispatch, selectedItems) {

    const inputModal = (payload) => dispatch({
        type: "INPUTMODAL",
        payload: payload
    })
    const operationType = (payload) => dispatch({
        type: "OPERATIONTYPE",
        payload: payload,
    })
    const itemInOperation = (payload) => dispatch({
        type: "ITEMINOPERATION",
        payload: payload,
    })
    const inputPromiseResolver = (payload) => dispatch({
        type: "INPUTPROMISERESOLVER",
        payload: payload,
    })
    switch (state.functionId) {
        case 3: { //rename
            operationType(1)
            console.log(selectedItems["name"])
            itemInOperation(selectedItems["name"])
            const renameAsync = async () => {
                let completedSize = 0
                let totalSize = 0
                selectedItems["itemDest"] = state.tabs[state.currentTab]["path"]
                inputModal("Item")
                selectedItems["name"] = await new Promise((resolve) => {
                    inputPromiseResolver(resolve)
                })
                await useCopyMoveItem(
                    dispatch,
                    1,
                    completedSize,
                    totalSize,
                    selectedItems
                )
                inputModal(0)
                operationType(-1)
                useCache(dispatch, state.tabs[state.currentTab]["path"])
                itemInOperation("")
                dispatch({
                    type: "TOAST",
                    payload: "Item renamed."
                })
            }
            renameAsync()
            break
        }
        case 4: { //open selecteditem in newtab
            if (selectedItems.length == 0 || selectedItems.isFile) {
                dispatch({
                    type: "DUPLICATETAB",
                    payload: {
                        tabKey: state.tabCounter,
                        title: state.tabs[state.currentTab]["name"],
                        path: state.tabs[state.currentTab]["path"],
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
            itemInOperation("")
            const newFolderAsync = async () => {
                let updatedName
                inputModal("Folder")
                updatedName = await new Promise((resolve) => {
                    inputPromiseResolver(resolve)
                })
                await useNewItem(state.tabs[state.currentTab]["path"], 0, updatedName)
                inputModal(0)
                operationType(-1)
                useCache(dispatch, state.tabs[state.currentTab]["path"])
            }
            newFolderAsync()
            break
        }
        case 6: { //new file
            itemInOperation("")
            const newFileAsync = async () => {
                let updatedName
                inputModal("File")
                updatedName = await new Promise((resolve) => {
                    inputPromiseResolver(resolve)
                })
                await useNewItem(state.tabs[state.currentTab]["path"], 1, updatedName)
                inputModal(0)
                operationType(-1)
                useCache(dispatch, state.tabs[state.currentTab]["path"])
            }
            newFileAsync()
            break
        }
        case 7: {
            operationType(state.functionId)
            dispatch({
                type: "OPERATIONDEST",
                payload: state.tabs[state.currentTab]["path"],
            })
            zipHandler()
            break
        }
    }
    return [1]
}