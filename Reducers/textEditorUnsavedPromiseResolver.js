export default function textEditorUnsavedPromiseResolver(state = 0, action) {
    if (action.type == "TEXTEDITORUNSAVEDPROMISE")
        return action.payload
    return state
}