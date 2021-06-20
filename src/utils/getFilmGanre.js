const getFilmGenre = (arr1, arr2) => arr1.filter(genr => arr2.includes(genr.id));

export default getFilmGenre;