import { createContext, useContext, useEffect, useState } from "react";


const MovieContext = createContext();

// Clave usada para localStorage
const STORAGE_KEY = "tmdb_favorites"; 

// Función auxiliar para obtener el valor inicial desde localStorage
const getInitialFavorites = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        // Devuelve el JSON parseado si existe y es un array, si no, devuelve un array vacío
        if (raw) {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        }
    } catch (e) {
        console.error("Error al cargar favoritos desde localStorage:", e);
    }
    return []; // Devuelve vacío si falla o no existe
};


// Hook personalizado para consumir el contexto
export function useMovies() {
    const ctx = useContext(MovieContext);
    if (!ctx) throw new Error("useMovies must be used within MovieProvider");
    return ctx;
}


// Proveedor del contexto
export function MovieProvider({ children }) {
    // 1. Inicializa el estado directamente con el valor de localStorage (¡CORRECCIÓN CLAVE!)
    const [favorites, setFavorites] = useState(getInitialFavorites);


    // 2. Guarda favoritos en localStorage cada vez que 'favorites' cambia
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch (e) {
            console.error("Error al guardar favoritos en localStorage:", e);
            // Opcional: Notificar al usuario que no se pudo guardar
        }
    }, [favorites]); // Se ejecuta solo cuando la lista de favoritos cambia


    // Funciones de gestión de favoritos
    const isFavorite = (m) => favorites.some((f) => f.id === m.id);
    
    const addFavorite = (m) => {
        if (!isFavorite(m)) {
            // Aseguramos que la película tenga un ID para evitar errores en la lista
            if (m.id) {
                setFavorites((s) => [m, ...s]);
            } else {
                console.warn("Película sin ID, no se puede añadir a favoritos:", m);
            }
        }
    };
    
    const removeFavorite = (m) => setFavorites((s) => s.filter((f) => f.id !== m.id));


    return (
        <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </MovieContext.Provider>
    );
}