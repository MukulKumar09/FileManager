export default function mountingPoints(state = 123456, action) {
    if (action.type == "SETMOUNTINGPOINTS") {
        return action.payload
    }
    return state
}