export default function operationWindow(state = 0, action) {
    if (action.type == "OPERATIONWINDOW")
        return !state
    return state
}