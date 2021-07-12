// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-light" style={{ backgroundColor: 'rgb(145, 57, 57)' }}>
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand" style={{ color: 'wheat' }}>Home</Link>
                <form >
                    <Link to={"/favorite"} className="btn btn-sm btn-secondary">My Favorite</Link>
                </form>
            </div>
        </nav>
    )
}