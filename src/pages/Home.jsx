import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";


export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // API Key de ejemplo (debes asegurarte de que import.meta.env.VITE_TMDB_API_KEY esté definido)
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
    const BASE = "https://api.themoviedb.org/3";


    // Carga inicial de películas populares
    useEffect(() => {
        async function loadPopular() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
                
                if (!res.ok) throw new Error("Failed to fetch popular movies.");
                
                const data = await res.json();
                setMovies(data.results);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadPopular();
    }, [API_KEY]); // Dependencia API_KEY para asegurar que se ejecuta cuando la clave está disponible


    // Manejo de la búsqueda
    async function handleSearch(e) {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`);
            
            if (!res.ok) throw new Error("Failed to search movies.");
            
            const data = await res.json();
            setMovies(data.results);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <main className="">
            {/* Formulario de Búsqueda (Estilo Píldora definido en index.css) */}
            <form onSubmit={handleSearch} className="">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="" 
                    placeholder="Buscar películas..."
                    type="text" 
                />
                <button className="" type="submit">Buscar</button> 
            </form>


            {/* Indicadores de estado */}
            {loading && <p className="loading">Cargando...</p>}
            {error && <p className="error">{error}</p>}
            
            {/* Si no hay películas y no estamos cargando */}
            {!loading && movies.length === 0 && !error && searchQuery.trim() && (
                <p className="error">No se encontraron resultados para "{searchQuery}".</p>
            )}


            {/* Grid de Películas */}
            <div className="grid"> 
                {movies.map((m) => m.poster_path && <MovieCard key={m.id} movie={m} />)}
            </div>
        </main>
    );
}