export default function allTabsModal(state = 0, action) {
    if (action.type == "ALLTABSMODAL")
        return !state
    return state
}