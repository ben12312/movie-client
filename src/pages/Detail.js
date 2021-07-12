import React, { useEffect, useState } from 'react';
import { reassignFavorite } from '../store/action';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

export default function MovieDetail() {
    let { id } = useParams();
    let [movie, setMovie] = useState([])
    const API_SEARCH_BY_ID = `https://api.themoviedb.org/3/movie/${id}?api_key=eef677a855c09c071ba6f4fb66b4869f&language=en-US`
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites)

    function fetchDetailMovie() {
        fetch(API_SEARCH_BY_ID, { method: 'GET' })
            .then(response => response.json())
            .then(movie => { setMovie(movie) })
    }

    function AddToFavorite(movie) {
        let counter = 0
        favorites.forEach(favMovie => {
            if (+favMovie.id === +movie.id) {
                counter++
            }
        })

        if (counter === 0) {
            // GUNAKAN DISPATCH UNTUK MENGGUNAKAN ACTION TIDAK BISA GUNAKAN ACTION LGSG
            dispatch(reassignFavorite(movie))
            // PAKE HISTORY PUSH BIAR GA PAKE <LINK>

        } else {
            return (
                <h1 style={{ color: 'wheat' }}>Movie already added</h1>
            )
        }
    }

    useEffect(() => {
        fetchDetailMovie()
        // eslint-disable-next-line
    }, [id])


    // RENDER
    if (movie.id) {
        return (
            <>
                <div className="container">
                    <h1 className="my-4" style={{ color: 'wheat' }}>{movie.title}</h1>
                </div>
                <div className="row" style={{ marginBottom: '1cm' }}>

                    <div className="col-md-8">
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} style={{ width: '500px', height: '550px' }} className="card-img-top" alt="" />
                    </div>

                    <div className="col-md-4">
                        <h3 className="my-3" style={{ color: 'wheat' }}>{movie.tagline}</h3>
                        <h4 style={{ color: '#FA8072' }}>Description :</h4>
                        <h5 className="card-text text-muted">{movie.overview}</h5>
                        <h3 style={{ color: '#FA8072' }} className="my-3">Genres</h3>
                        <ul>
                            {
                                movie.genres?.map(genre => {
                                    return <li key={genre.id} className="card-text text-muted">{genre.name}</li>
                                })
                            }
                        </ul>
                        <button onClick={() => AddToFavorite(movie)} className="btn btn-danger">Add to Favorite</button>
                    </div>
                    <h3 className="my-4" style={{ color: 'wheat' }}>Release Year : {movie.release_date}</h3>
                </div>
            </>
        )
    } else if (!movie.success) {
        return (
            <>
                <h1 className="my-4" style={{ color: 'wheat' }}>{movie.status_message}</h1>
            </>
        )
    }
}