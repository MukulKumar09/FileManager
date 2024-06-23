export default function FavouritesModalReducer(state, action) {
    if (action.type == "FAVOURITESMODAL")
        return !state
    return state
}