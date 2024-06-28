export default function favouritesModal(state = 0, action) {
    if (action.type == "FAVOURITESMODAL")
        return !state
    return state
}