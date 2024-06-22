export default function ItemInOperationReducer(state, action) {
    if (action.type == "ITEMINOPERATION") {
        return action.payload
    }
    return state
}