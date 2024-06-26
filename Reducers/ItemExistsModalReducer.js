export default function itemExistsModal(state = 0, action) {
    if (action.type == "ITEMEXISTSMODAL") {
        return !state
    }
    return state
}
