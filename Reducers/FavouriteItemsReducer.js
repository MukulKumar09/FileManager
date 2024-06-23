export default function FavouriteItemsReducer(state, action) {
    if (action.type == "FAVOURITESMODAL")
        return !state
    return state
}