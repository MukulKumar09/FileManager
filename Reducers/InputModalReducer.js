export default function inputModal(state = 0, action) {
    if (action.type == "INPUTMODAL") {
        return action.payload
    }
    return state
}