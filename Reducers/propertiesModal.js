export default function propertiesModal(state = 0, action) {
    if (action.type == "PROPERTIESMODAL") {
        return action.payload
    }
    return state
}