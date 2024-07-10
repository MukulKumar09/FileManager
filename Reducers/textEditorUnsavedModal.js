export default function textEditorUnsavedModal(state = 0, action) {
    if (action.type == "TEXTEDITORUNSAVEDMODAL")
        return !state
    return state
}