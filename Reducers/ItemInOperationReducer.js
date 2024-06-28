export default function itemInOperation(state = "", action) {
    if (action.type == "ITEMINOPERATION") {
        return action.payload
    }
    return state
}