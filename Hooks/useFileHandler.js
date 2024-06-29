import useOpenExternally from "./useOpenExternally"
export default function useFileHandler(state, dispatch, item) {
    if (item.isDirectory()) {
        dispatch({
            type: "MODIFYTABPATH",
            payload: {
                tabId: state.currentTab,
                value: item["path"]
            }
        })
        dispatch({
            type: "MODIFYTABNAME",
            payload: {
                tabId: state.currentTab,
                value: item["name"]
            }
        })
    } else {
        const parts = item.name.split(".")
        const ext = parts.pop()
        switch (ext.toLowerCase()) {
            case "jpeg":
            case "png":
            case "jpg":
            case "gif": {
                console.log(!state.mediaBox)
                state.mediaBox == 0 && dispatch({
                    type: "SETMEDIABOX"
                })
                dispatch({
                    type: "SETSELECTEDITEM",
                    payload: item
                })
                dispatch({
                    type: "SETMEDIATYPE",
                    payload: 1
                })
                break
            }
            case "mp4":
            case "mp3":
            case "avi":
            case "mkv":
            case "wav":
            case "midi": {
                console.log(!state.mediaBox)
                state.mediaBox == 0 && dispatch({
                    type: "SETMEDIABOX"
                })
                dispatch({
                    type: "SETSELECTEDITEM",
                    payload: item
                })
                dispatch({
                    type: "SETMEDIATYPE",
                    payload: 2
                })
                break
            }
            default: {
                state.mediaBox == 1 && dispatch({
                    type: "SETMEDIABOX"
                })
                dispatch({
                    type: "SETSELECTEDITEM",
                    payload: []
                })
                dispatch({
                    type: "SETMEDIATYPE",
                    payload: 0
                })
                useOpenExternally(item)
            }
        }
    }
}