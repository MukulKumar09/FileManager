export default function CacheReducer(state, action) {
    if (action.type == "ADDTOCACHE")
        return {
            ...state,
            [action.payload.key]: action.payload.value
        }
    return state
}