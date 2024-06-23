export default function ContextMenuReducer(state, action) {
    if (action.type == "CONTEXTMENU")
        return !state
    return state
}