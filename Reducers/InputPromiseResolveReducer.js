export default function InputPromiseResolveReducer(state, action) {
    if (action.type == "INPUTPROMISERESOLVER") {
        return action.payload
    }
    return state
}