export default function OperationWindowReducer(state, action) {
    if (action.type == "OPERATIONWINDOW")
        return !state
    return state
}