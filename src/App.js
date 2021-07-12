// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useEffect } from 'react';
import MovieCard from "./components/MovieCard.jsx";
import Favorite from './pages/Favorite';
import Navbar from './components/Navbar';
import Detail from "./pages/Detail";
// import useDebounce from './helpers/debounce';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { reassignMovies, changePage, changeSearch } from './store/action';

const MOVIE_API = 'https://api.themoviedb.org/3/movie/popular?api_key=eef677a855c09c071ba6f4fb66b4869f&language=en-US&page='

export default function App() {
  // CREATE DISPATCH TO MAKE DISPATCH
  const dispatch = useDispatch()

  const movies = useSelector(state => state.movies)
  const moviePage = useSelector(state => state.moviePage)
  const search = useSelector(state => state.search)


  // FETCH MOVIES
  function fetchMovie(moviePage) {
    fetch(MOVIE_API + moviePage, { method: 'GET' })
      .then(response => response.json())
      .then(movies => dispatch(reassignMovies(movies.results)))
  }

  // ALWAYS FETCH MOVIE
  useEffect(() => {
    fetchMovie(moviePage)
    // eslint-disable-next-line
  }, [moviePage])

  // SEARCH ENGINE---------------------------------------------------------------
  useEffect(() => {
    if (search !== "") {
      let searchedMovie = movies.filter(movie => {
        return movie.title.toLowerCase().includes(search.toLowerCase())
      })
      dispatch(reassignMovies(searchedMovie))
    } else {
      fetchMovie(moviePage)
    }
    // eslint-disable-next-line
  }, [search])

  // PREVIOUS BUTTON
  const previousButton = (() => {
    if (moviePage <= 1) {
      dispatch(changePage(1))
    } else {
      dispatch(changePage(moviePage - 1))
    }
  })

  // NEXT BUTTON
  const nextButton = (() => {
    dispatch(changePage(moviePage + 1))
  })

  // SEARCH ENGINE BOUNCE
  const searchEngine = ((event) => {
    dispatch(changeSearch(event.target.value))
  })

  // NOT FOUND WHILE SEARCH
  if (movies.length === 0) {
    return (
      <h1 className="text-center" style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>Loading...</h1>
    )
  }


  // RENDER PAGE ------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Router>
        <Navbar></Navbar>

        <div className="col-md-8 offset-md-2">
          <Switch>

            <Route exact path="/detail/:id">
              <Detail></Detail>
            </Route>

            <Route exact path="/favorite">
              <Favorite></Favorite>
            </Route>

            <Route exact path="/">
              <h1 className="text-center" style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>Movies</h1>

              <div className="input-group rounded" style={{ marginBottom: '0.5cm' }}>
                <input value={search} onChange={searchEngine} type="search" className="form-control rounded" placeholder="Search Movie" aria-label="Search"
                  aria-describedby="search-addon" />
              </div>

              <div style={{ textAlign: "center", marginBottom: "1cm" }}>
                <button style={{ marginRight: "0.5cm" }} onClick={() => previousButton()} className="btn btn-danger">previous</button>
                <button style={{ marginLeft: "0.5cm" }} onClick={() => nextButton()} className="btn btn-danger">next</button>
              </div>

              <div className="row bg-faded">
                {
                  movies.map(movie => {
                    return <MovieCard key={movie.id} movie={movie} />
                  })
                }
              </div>
            </Route>

          </Switch>
        </div>

      </Router>
    </React.Fragment>
  )
}
