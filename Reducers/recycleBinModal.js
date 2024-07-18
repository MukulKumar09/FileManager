export default function recycleBinModal(state = 0, action) {
    if (action.type == "RECYCLEBINMODAL")
        return !state
    return state
}