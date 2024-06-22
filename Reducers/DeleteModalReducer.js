export default function DeleteModalReducer(state, action) {
    if (action.type == "DELETEMODAL")
        return !state
    return state
}