export default function deleteModal(state = 0, action) {
    if (action.type == "DELETEMODAL")
        return !state
    return state
}