export default function selectedItem(state = [], action) {
    if (action.type == "SELECTEDITEM") {
        return action.payload
    }
    return state
}
