// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function MovieCard(props) {
    let movie = props.movie

    return (
        <>
            <div key={movie.id} className="col-md-3">
                <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title" style={{ color: 'wheat' }}>{movie.title}</h5>
                    <p className="card-text text-muted">{movie.overview}</p>
                    <div className="container">
                        <Link to={`/detail/${movie.id}`} style={{ textAlign: "center", marginLeft: '1cm' }} type="button" className="btn btn-danger btn-sm">Detail</Link>
                    </div>
                </div>
            </div>
        </>
    )
}