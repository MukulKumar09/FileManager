export default function SelectedItemReducer(state, action) {
    if (action.type == "SELECTEDITEM") {
        return action.payload
    }
    return state
}
