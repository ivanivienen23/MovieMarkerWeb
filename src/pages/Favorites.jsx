import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";


export default function Favorites() {
const { favorites } = useMovies();


return (
<main className="favorites-content"> {/* CLASE CLAVE para limitar el ancho de la grilla */}
{/* Título de Favoritos centrado y estilizado */}
<h2 style={{ 
  textAlign: 'center', 
  fontSize: '2.5rem', 
  marginBottom: '40px', 
  fontWeight: '700', 
  color: '#ff6b6b', 
  textShadow: '0 0 10px rgba(255, 107, 107, 0.4)' 
}}>
  Favoritos
</h2>


{favorites.length === 0 ? (
  <div style={{ 
    textAlign: 'center', 
    padding: '2rem', 
    borderRadius: '12px', 
    backgroundColor: '#1e1e1e', 
    border: '1px solid #ff6b6b55', 
    color: '#c9d1d9', 
    maxWidth: '500px', 
    margin: '30px auto', 
    fontSize: '1.2rem', 
    boxShadow: '0 5px 15px rgba(0,0,0,0.4)'
  }}>
    ¡Aún no tienes películas favoritas! <br /> Explora y añade algunas.
  </div>
) : (
  <div className="grid"> {/* El CSS global .favorites-content .grid lo limitará y centrará */}
    {favorites.map((m) => <MovieCard key={m.id} movie={m} />)}
  </div>
)}
</main>
);
}