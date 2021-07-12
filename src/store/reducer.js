import { REASSIGNMOVIES, CHANGEPAGE, CHANGESEARCH, REASSIGNFAVORITE, DELETEFAVORITE } from './action';

const states = {
    movies: [],
    moviePage: 1,
    search: '',
    favorites: []
}

// ACTION ( KATA - KATA/KATA (KUNCI) UNTUK MENTRIGER  PERUBAHAN )
function counterReducer(state = states, action) {
    const { type, payload } = action
    switch (type) {
        case REASSIGNMOVIES:
            return { ...state, movies: payload }
        case CHANGEPAGE:
            return { ...state, moviePage: payload }
        case CHANGESEARCH:
            // spread atau nge paparin semua states
            return { ...state, search: payload }
        case REASSIGNFAVORITE:
            // SHALLOW COPY/ CARA LAIN TANPA MUTASI 
            return { ...state, favorites: [...state.favorites, payload] }
        case DELETEFAVORITE:
            return { ...state, favorites: payload }
        default:
            return state
    }
}

export default counterReducer