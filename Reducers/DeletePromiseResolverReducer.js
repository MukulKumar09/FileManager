export default function DeletePromiseResolverReducer(state, action) {
    if (action.type == "DELETEPROMISERESOLVER")
        return action.payload
    return state
}