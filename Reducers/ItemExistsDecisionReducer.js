export default function ItemExistsDecisionReducer(state, action) {
    if (action.type == "ITEMEXISTSDECISION") {
        return action.payload
    }
    return state
}