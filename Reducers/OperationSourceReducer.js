export default function OperationSourceReducer(state, action) {
    if (action.type == "OPERATIONSOURCE")
        return action.payload
    return state
}