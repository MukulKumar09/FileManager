export default function aboutModal(state = 0, action) {
    if (action.type == "ABOUTMODAL")
        return !state
    return state
}