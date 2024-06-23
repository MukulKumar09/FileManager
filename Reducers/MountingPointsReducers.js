export default function MountingPointsReducer(state, action) {
    if (action.type == "SETMOUNTINGPOINTS") {
        return action.payload
    }
    return state
}