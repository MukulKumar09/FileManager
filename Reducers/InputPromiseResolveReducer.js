export default function inputPromiseResolver(state = 0, action) {
    if (action.type == "INPUTPROMISERESOLVER") {
        return action.payload
    }
    return state
}