import useDeleteItem from "./useDeleteItem";
import useMoveItem from "./useCopyMoveItem";
import useNewItem from "./useNewItem";
export default function useStageItems(state, dispatch, type, selectedItems) {
    if (![5, 6].includes(type) && selectedItems.length == 0) {
        dispatch({
            type: "TOAST",
            payload:
                "No items selected",
        })
    } else {
        dispatch({
            type: 'COPYTOCB',
            payload: selectedItems
        })
        dispatch({
            type: "OPERATIONSOURCE",
            payload: state.tabs[state.currentTab]["path"],
        })
        switch (type) {
            case 0:
            case 1: { //copy,move
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: type,
                })
                dispatch({
                    type: "TOAST",
                    payload:
                        selectedItems.length + " items " + (type ? "ready to move" : "copied"),
                })
                break
            }
            case 2: { //delete
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: type,
                })
                dispatch({
                    type: "OPERATIONSOURCE",
                    payload: state.tabs[state.currentTab]["path"],
                })
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
                        for (item of state.clipboardItems) {
                            await useDeleteItem(item["path"])
                        }
                        dispatch({
                            type: "DELETEMODAL"
                        })
                    } else {
                        dispatch({
                            type: "DELETEMODAL"
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
                    let updatedName
                    dispatch({
                        type: "INPUTMODAL",
                        payload: "Item"
                    })
                    updatedName = await new Promise((resolve) => {
                        dispatch({
                            type: "INPUTPROMISERESOLVER",
                            payload: resolve
                        })
                    })
                    await useMoveItem(item["path"], updatedName)
                }
                renameAsync()
                break
            }
            case 4: { //open selecteditem in newtab
                console.log("is it: ", selectedItems)
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
                }
                newFileAsync()
                break
            }
            case 7: {
                dispatch({
                    type: "OPERATIONTYPE",
                    payload: type,
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
    }
    return [1]
}