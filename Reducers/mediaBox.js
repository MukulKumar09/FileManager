export default function mediaBox(state = 0, action) {
    if (action.type == "SETMEDIABOX")
        return action.payload;
    return state
}
