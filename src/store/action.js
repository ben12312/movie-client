// GUNA FILE INI UNTUK MENYEMBUNYIKAN KATA KUNCI
export const REASSIGNMOVIES = 'movies/reassignMovies'
export const CHANGEPAGE = 'moviePage/changePage'
export const CHANGESEARCH = 'search/changeSearch'
export const REASSIGNFAVORITE = 'favorite/resassignFavorite'
export const DELETEFAVORITE = 'favorite/deleteFavorite'


// BUAT APPS.js
export function reassignMovies(payload) {
    return { type: REASSIGNMOVIES, payload }
}

export function changePage(payload) {
    return { type: CHANGEPAGE, payload }
}

export function changeSearch(payload) {
    return { type: CHANGESEARCH, payload }
}
export function reassignFavorite(payload) {
    return { type: REASSIGNFAVORITE, payload }
}

export function deleteFavorite(payload) {
    return { type: DELETEFAVORITE, payload }
}