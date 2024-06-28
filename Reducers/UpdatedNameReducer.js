export default function updatedName(state = "", action) {
    if (action.type == "UPDATEDNAME") {
        return action.payload
    }
    return state
}