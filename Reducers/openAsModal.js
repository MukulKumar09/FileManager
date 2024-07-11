export default function openAsModal(state = 0, action) {
    if (action.type == "OPENASMODAL")
        return action.payload
    return state
}
