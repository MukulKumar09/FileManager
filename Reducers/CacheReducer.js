export default function CacheReducer(state, action) {
    switch (action.type) {
        case "UPDATECACHE":
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        default:
            return state
    }
}