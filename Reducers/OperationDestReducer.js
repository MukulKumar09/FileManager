export default function OperationDestReducer(state, action) {
    if (action.type == "OPERATIONDEST")
        return action.payload
    return state

}