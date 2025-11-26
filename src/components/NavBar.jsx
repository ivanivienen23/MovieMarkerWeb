import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          MyMovies
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </nav>
    </header>
  );
}
