export default function webBrowserModal(state = 0, action) {
    if (action.type == "WEBBROWSERMODAL")
        return action.payload;
    return state
}
