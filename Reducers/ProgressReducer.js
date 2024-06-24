export default function ProgressReducer(state, action) {
    if (action.type == "SETPROGRESS") {
        return action.payload
    }
    return state
}