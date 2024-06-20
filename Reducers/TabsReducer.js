export default function TabsReducer(state, action) {
    switch (action.type) {
        case 'ADDTAB':
            return {
                ...state,
                [action.payload.tabKey]: {
                    title: "Home",
                    path: "Home",
                    type: "filebrowser",
                }
            }
        case "DELETETAB": {
            let tempState = { ...state }
            delete tempState[action.payload]
            return tempState
        }
        case 'MODIFYTABNAME': {
            let tempState = { ...state }
            tempState[action.payload.tabId]["title"] = action.payload.value
            return tempState
        }
        case 'MODIFYTABPATH': {
            let tempState = { ...state }
            tempState[action.payload.tabId]["path"] = action.payload.value
            return tempState
        }
        case 'DUPLICATETAB':
            return {
                ...state,
                [action.payload.tabKey]: {
                    title: action.payload.title,
                    path: action.payload.path,
                    type: action.payload.type,
                }
            }
        case 'DELETEOTHERTABS':
            return {
                [action.payload.tabId]: state[action.payload.tabId]
            }
        case 'RESETTABS':
            return {
                0: {
                    title: "Home",
                    path: "Home",
                    type: "filebrowser",
                }
            }
        default:
            return state
    }
}