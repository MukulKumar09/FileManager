export default function InputModalReducer(state, action) {
    if (action.type == "INPUTMODAL") {
        return action.payload
    }
    return state
}