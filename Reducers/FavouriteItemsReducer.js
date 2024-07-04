import RNFS from 'react-native-fs';
export default function favouriteItems(state = [], action) {
    switch (action.type) {
        case "SETFAVOURITEITEM": {
            return action.payload
        }
        case "ADDFAVOURITEITEM": {
            let tempFavorites = [
                ...state,
                action.payload
            ]
            RNFS.writeFile(RNFS.ExternalCachesDirectoryPath + "/favorites.json", JSON.stringify(tempFavorites))
            return tempFavorites
        }
        case "REMOVEFAVOURITEITEM": {
            let tempFavorites = [
                ...state.filter(item => item["path"] !== action.payload)
            ]
            RNFS.writeFile(RNFS.ExternalCachesDirectoryPath + "/favorites.json", JSON.stringify(tempFavorites))
            return tempFavorites
        }
        case "CLEARFAVOURITES": {
            RNFS.writeFile(RNFS.ExternalCachesDirectoryPath + "/favorites.json", "[]")
            return []
        }
    }
    return state
}