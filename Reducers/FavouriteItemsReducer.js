export default function favouriteItems(state = [], action) {
    if (action.type == "FAVOURITEITEMS")
        return !state
    return state
}