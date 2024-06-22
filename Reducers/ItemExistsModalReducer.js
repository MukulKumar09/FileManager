export default function ItemExistsModalReducer(state, action) {
    if (action.type == "ITEMEXISTSMODAL") {
        return !state
    }
    return state
}
