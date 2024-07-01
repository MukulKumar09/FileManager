
export default function cache(state = {}, action) {
    switch (action.type) {
        case "SETCACHE": {
            return action.payload
        }
        case "UPDATECACHE":
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        default:
            return state
    }
}