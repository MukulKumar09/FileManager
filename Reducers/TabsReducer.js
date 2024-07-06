export default function tabs(state = {}, action) {
    switch (action.type) {
        case 'ADDTAB':
            return {
                ...state,
                [action.payload.tabKey]: {
                    title: action.payload.title,
                    path: action.payload.path,
                    type: action.payload.type,
                }
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
        case "DELETETAB": {
            let tempState = { ...state }
            delete tempState[action.payload]
            return tempState
        }
        case 'DELETEOTHERTABS':
            return {
                [action.payload]: state[action.payload]
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