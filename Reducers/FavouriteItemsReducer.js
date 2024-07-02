export default function favouriteItems(state = [], action) {
    switch (action.type) {
        case "SETFAVOURITEITEM": {
            return action.payload
        }
        case "ADDFAVOURITEITEM": {
            return [
                ...state,
                action.payload
            ]
        }
        case "REMOVEFAVOURITEITEM": {
            return [
                ...state.filter(item => item["path"] !== action.payload)
            ]
        }
        case "CLEARFAVOURITES": {
            return []
        }
    }
    return state
}