export default function ClipBoardModalReducer(state, action) {
    if (action.type == "CLIPBOARDMODAL")
        return !state
    return state
}