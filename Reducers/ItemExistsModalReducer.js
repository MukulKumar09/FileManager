export default function itemExistsModal(state = 0, action) {
    if (action.type == "ITEMEXISTSMODAL") {
        console.log(!state)
        return !state
    }
    return state
}
