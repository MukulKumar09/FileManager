export default function AboutModalReducer(state, action) {
    if (action.type == "ABOUTMODAL")
        return !state
    return state
}