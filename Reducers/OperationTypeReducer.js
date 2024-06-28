export default function operationType(state = -1, action) {
    if (action.type == "OPERATIONTYPE")
        return action.payload
    return state

}