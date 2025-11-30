import { useMovies } from "../context/MovieContext";


export default function MovieCard({ movie }) {
    const { addFavorite, removeFavorite, isFavorite } = useMovies();
    
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : null;
    
    // Verifica si la película es favorita
    const fav = isFavorite(movie);


    return (
        <div className="card"> {/* Usa la clase 'card' global */}
            {/* Imagen o Placeholder */}
            {posterUrl ? (
                <img src={posterUrl} alt={movie.title} /> 
            ) : (
                <div className="w-full h-72 flex items-center justify-center bg-gray-300" style={{ height: '300px', backgroundColor: '#30363d', color: '#c9d1d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    No Image
                </div>
            )}

            {/* BOTÓN DE FAVORITO: Flotante con clase 'fav-button' (Overlay al hacer hover) */}
            <button
                onClick={() => (fav ? removeFavorite(movie) : addFavorite(movie))}
                className={`fav-button ${fav ? "active" : ""}`} // Aplica la clase 'active' para el corazón relleno
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
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