export default function FunctionIdReducer(state, action) {
    if (action.type == "FUNCTIONID")
        return action.payload
    return state

}