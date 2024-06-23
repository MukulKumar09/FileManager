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
        if (["jpeg", "png", "jpg", "gif"].includes(ext.toLowerCase())) {
            dispatch({
                type: "SETMEDIATYPE",
                payload: 1
            })
        }
        else if (["mp4", "mp3", "avi", "mkv", "wav", "mid"].includes(ext)) {
            dispatch({
                type: "SETMEDIATYPE",
                payload: 2
            })
        } else {
            dispatch({
                type: "SETMEDIATYPE",
                payload: 0
            })
            useOpenExternally(item)
        }
    }
}