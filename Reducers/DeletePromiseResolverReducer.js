export default function deletePromiseResolver(state = 0, action) {
    if (action.type == "DELETEPROMISERESOLVER")
        return action.payload
    return state
}