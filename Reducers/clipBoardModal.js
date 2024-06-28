export default function clipBoardModal(state = 0, action) {
    if (action.type == "CLIPBOARDMODAL")
        return !state
    return state
}