export default function CurrentTabReducer(state, action) {
    if (action.type == "SETCURRENTTAB")
        return action.payload
    return state
}