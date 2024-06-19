export default function OperationTypeReducer(state, action) {
    if (action.type == "OPERATIONTYPE")
        return action.payload
    return state

}