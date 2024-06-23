export default function MediaTypeReducer(state, action) {
    if (action.type == "SETMEDIATYPE")
        return action.payload;
    return state
}