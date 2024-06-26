export default function itemExistsPromiseResolver(state = 0, action) {
    if (action.type == "ITEMEXISTSPROMISERESOLVER") {
        return action.payload
    }
    return state
}