const initialState = {favoritesFilm: [], isFavorite: false};

const addToFavorites = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_FAVORITES':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(
        item => item.id === action.value.id,
      );
      if (favoriteFilmIndex !== -1) {
        // the movie exists ? delete it
        newState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(
            (item, index) => index !== favoriteFilmIndex,
          ),
        };
      } else {
        //Don't exist? add it
        newState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value],
        };
      }
      return newState || state;

    default:
      return state;
  }
};

export default addToFavorites;
