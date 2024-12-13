export default function favourites(state = [], action) {
  switch (action.type) {
    case 'ADDFAVORITE': {
      const item = action.payload;
      const isItemExists = state.find(favItem => favItem.path == item.path);
      if (!isItemExists) {
        const tempFavourites = [...state, {...item, isCustomItem: true}];
        return tempFavourites;
      }
      return state;
    }
    case 'REMOVEFAVORITE': {
      let tempFavourites = [
        ...state.filter(favItem => favItem.path !== action.payload.path),
      ];
      return tempFavourites;
    }
    case 'CLEARFAVORITES': {
      return [];
    }
  }
  return state;
}
