export default function operationDest(state = "", action) {
    if (action.type == "OPERATIONDEST")
        return action.payload
    return state

}