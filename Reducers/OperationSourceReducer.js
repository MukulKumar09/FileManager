export default function operationSource(state = "", action) {
    if (action.type == "OPERATIONSOURCE")
        return action.payload
    return state
}