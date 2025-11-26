import { useMovies } from "../context/MovieContext";


export default function MovieCard({ movie }) {
    const { addFavorite, removeFavorite, isFavorite } = useMovies();
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : null;
    const fav = isFavorite(movie);


    return (
        <div className="card"> {/* Contenedor principal de la tarjeta */}
            {posterUrl ? (
                // La imagen se gestiona por el CSS global
                <img src={posterUrl} alt={movie.title} /> 
            ) : (
                <div className="w-full h-72 flex items-center justify-center bg-gray-300">No Image</div>
            )}

            {/* BOTÓN DE FAVORITO: Flotante con clase 'fav-button' */}
            <button
                onClick={() => (fav ? removeFavorite(movie) : addFavorite(movie))}
                className={`fav-button ${fav ? "active" : ""}`}
            >
                {fav ? "♥" : "♡"}
            </button>


            {/* INFORMACIÓN DE LA PELÍCULA: Título y Año (siempre visibles) */}
            <div className="card-info"> 
                <h2>{movie.title}</h2>
                <p>{(movie.release_date || "").slice(0, 4)}</p>
            </div>
        </div>
    );
}