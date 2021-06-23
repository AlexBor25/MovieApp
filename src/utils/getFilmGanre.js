const getFilmGenre = (arr1, arr2) => arr1.filter(genre => arr2.includes(genre.id));

export default getFilmGenre;