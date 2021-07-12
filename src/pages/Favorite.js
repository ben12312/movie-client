import { useSelector, useDispatch } from 'react-redux';
import { deleteFavorite } from '../store/action'

export default function Favorite() {
    const favorites = useSelector(state => state.favorites)
    const dispatch = useDispatch()

    function deleteButton(id) {
        const newFavorites = favorites.filter(movie => movie.id !== id)
        dispatch(deleteFavorite(newFavorites))
    }

    if (favorites.length === 0) {
        return (
            <>
                <h1 className="text-center" style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>My Favorite Movies</h1>
                <h2 className="text-center" style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>No Movies added to Favorite</h2>
            </>
        )
    }

    return (
        <>
            <h1 className="text-center" style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>My Favorite Movies</h1>

            <div className="row bg-faded" style={{ marginBottom: '2cm' }}>
                {
                    favorites?.map(movie => {
                        return (
                            <div key={movie.id} className="col-md-4">
                                <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: 'wheat' }}>{movie.title}</h5>
                                    <p className="card-text text-muted">{movie.overview}</p>
                                    <button onClick={() => { deleteButton(movie.id) }} className="btn btn-danger" style={{ textAlign: "center", marginLeft: '2cm' }}>DELETE</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}