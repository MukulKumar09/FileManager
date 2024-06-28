export default function mountingPoints(state = [], action) {
    if (action.type == "SETMOUNTINGPOINTS") {
        return action.payload
    }
    return state
}