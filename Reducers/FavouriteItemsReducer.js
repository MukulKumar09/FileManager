export default function favouriteItems(state = [], action) {
    if (action.type == "FAVOURITESMODAL")
        return !state
    return state
}