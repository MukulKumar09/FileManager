export default function textEditorModal(state = 0, action) {
    if (action.type == "TEXTEDITORMODAL")
        return action.payload;
    return state
}
