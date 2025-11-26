import { createContext, useContext, useEffect, useState } from "react";


const MovieContext = createContext();


export function useMovies() {
const ctx = useContext(MovieContext);
if (!ctx) throw new Error("useMovies must be used within MovieProvider");
return ctx;
}


export function MovieProvider({ children }) {
const [favorites, setFavorites] = useState([]);


useEffect(() => {
const raw = localStorage.getItem("tmdb_favorites");
if (raw) setFavorites(JSON.parse(raw));
}, []);


useEffect(() => {
localStorage.setItem("tmdb_favorites", JSON.stringify(favorites));
}, [favorites]);


const isFavorite = (m) => favorites.some((f) => f.id === m.id);
const addFavorite = (m) => !isFavorite(m) && setFavorites((s) => [m, ...s]);
const removeFavorite = (m) => setFavorites((s) => s.filter((f) => f.id !== m.id));


return (
<MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
{children}
</MovieContext.Provider>
);
}