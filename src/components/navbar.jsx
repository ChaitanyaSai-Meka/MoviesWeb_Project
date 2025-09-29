import { Link } from "react-router-dom";
import "../css/Navbar.css"
function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to='/'>Movies Web-X</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
        </div>
    </nav>
}

export default NavBar