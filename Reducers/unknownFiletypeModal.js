export default function unknownFiletypeModal(state = 0, action) {
    if (action.type == "UNKNOWNFILETYPEMODAL")
        return action.payload
    return state
}
