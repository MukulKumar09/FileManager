export default function itemExistsDecision(state = 0, action) {
    if (action.type == "ITEMEXISTSDECISION") {
        return action.payload
    }
    return state
}