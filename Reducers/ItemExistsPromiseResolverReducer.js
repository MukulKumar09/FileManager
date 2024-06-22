export default function ItemExistsPromiseResolverReducer(state, action) {
    if (action.type == "ITEMEXISTSPROMISERESOLVER") {
        return action.payload
    }
    return state
}