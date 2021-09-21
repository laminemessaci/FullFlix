const API_TOKEN = '55855f56e5cc6a0ed270d124c95e6ee7';

//Récuperation des films

export const getFilms = () => {
  const url =
    'https://api.themoviedb.org/3/movie/popular?api_key=' +
    API_TOKEN +
    '&language=fr&query=';
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getCastList = id => {
  // https://api.themoviedb.org/3/movie/848278/credits?api_key=55855f56e5cc6a0ed270d124c95e6ee7
  const url =
    'https://api.themoviedb.org/3/movie/' +
    id +
    '/credits?api_key=' +
    API_TOKEN +
    '&language=fr';

  return fetch(url)
    .then(response => response.json())
    .then(res => res.cast)
    .catch(error => console.error(error));
};

// Récupération du détail d'un film
export const getFilmDetailFromApi = id => {
  return fetch(
    'https://api.themoviedb.org/3/movie/' +
      id +
      '?api_key=' +
      API_TOKEN +
      '&language=fr',
  )
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getImageFilmFromApi = name => {
  return 'https://image.tmdb.org/t/p/w300' + name;
};
