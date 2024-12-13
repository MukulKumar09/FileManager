export default function favourites(state = [], action) {
  switch (action.type) {
    case 'ADDFAVORITE': {
      const isItemExists = state.find(item => item.path);
      if (!isItemExists) {
        const tempFavourites = [...state, action.payload];
        return tempFavourites;
      }
      return state;
    }
    case 'REMOVEFAVORITE': {
      let tempFavourites = [
        ...state.filter(item => item.path !== action.payload.path),
      ];
      return tempFavourites;
    }
    case 'CLEARFAVORITES': {
      return [];
    }
  }
  return state;
}
