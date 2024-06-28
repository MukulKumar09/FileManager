export default function progress(state = 0, action) {
    if (action.type == "SETPROGRESS") {
        return action.payload
    }
    return state
}