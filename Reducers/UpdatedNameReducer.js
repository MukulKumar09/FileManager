export default function UpdatedNameReducer(state, action) {
    if (action.type == "UPDATEDNAME") {
        return action.payload
    }
    return state
}