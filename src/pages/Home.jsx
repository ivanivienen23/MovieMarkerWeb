import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";


export default function Home() {
const [searchQuery, setSearchQuery] = useState("");
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";


useEffect(() => {
async function loadPopular() {
setLoading(true);
try {
const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
const data = await res.json();
setMovies(data.results);
} catch (e) {
setError(e.message);
} finally {
setLoading(false);
}
}
loadPopular();
}, []);


async function handleSearch(e) {
e.preventDefault();
if (!searchQuery.trim()) return;
setLoading(true);
try {
const res = await fetch(`${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`);
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
{/* APLICAMOS CLASES VACÍAS/SIMPLES para que index.css use los selectores elementales (form, input, button) */}
<form onSubmit={handleSearch} className="">
<input
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="" // Se selecciona por input[type="text"] en el CSS
placeholder="Buscar películas..."
type="text" // Aseguramos que es tipo texto para el selector CSS
/>
<button className="" type="submit">Buscar</button> {/* Se selecciona por form button[type="submit"] */}
</form>


{loading && <p className="loading">Cargando...</p>}
{/* Usamos la clase 'error' que definimos en index.css */}
{error && <p className="error">{error}</p>}


{/* Mantenemos la clase 'grid' de Tailwind aquí si la deseas, o usa solo 'grid' */}
<div className="grid"> 
{movies.map((m) => <MovieCard key={m.id} movie={m} />)}
</div>
</main>
);
}