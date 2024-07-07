export default function tabsContextMenu(state = 0, action) {
    if (action.type == "TABSCONTEXTMENU")
        return !state
    return state
}