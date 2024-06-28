export default function functionId(state = -1, action) {
    if (action.type == "FUNCTIONID")
        return action.payload
    return state

}